<?php

namespace App\Modules\Account\Users;

use App\Modules\Account\AccountException;
use App\Modules\Account\Auth\AuthService;
use App\Modules\Account\Notifications\ResetPasswordNotification;
use App\Modules\Base\Services\ApiService;
use Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class UserService
{
    public function __construct(User $model, AuthService $auth_service)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model, $this->getCustomFilters());
    }

    protected function getCustomFilters()
    {
        return [
            'access_level_in' => function ($query, $key, $input) {
                return $query->whereIn('access_level_id', $input);
            },
            // 'customer'     => function ($query, $key, $input) {
            //     if ($input == 'true') {
            //         return $query->whereHas($key);
            //     } else {
            //         return $query->whereDoesntHave($key);
            //     }
            // },
        ];
    }

    public function store(array $data, array $relations = [])
    {
        try {
            DB::beginTransaction();
            if (!empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }

            $user = $this->model->create($data);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $user;
    }

    public function update(array $data, int $id, array $relations = [])
    {
        try {
            DB::beginTransaction();

            if (empty($data['password'])) {
                unset($data['password']);
            } else {
                $data['password'] = Hash::make($data['password']);
            }

            $user = $this->model->findOrFail($id);

            $user->update($data);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $this->api->load($user, $relations);
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            if (auth()->user() && ($id == auth()->user()->id)) {
                throw new AccountException(500, "Não é possível remover o próprio usuário.");
            }

            $user = $this->model->findOrFail($id);

            $user->delete();

            $result = $user->deleted_at->toDateTimeString();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $result;
    }

    public function restore($id)
    {
        try {
            DB::beginTransaction();

            $user = $this->model->onlyTrashed()->findOrFail($id);

            $query = $this->model->where('username', $user->username)->orWhere('email', $user->email);

            if ($query->exists()) {
                $old = $query->first();

                $old->update([
                    'username' => "{$old->username}2",
                    'email'    => "{$old->email}2",
                ]);
            }

            $result = $user->restore();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $result;
    }

    public function sendResetLinkEmail(array $data = [])
    {
        if (!$this->model->where('email', $data['email'])->exists()) {
            throw new AccountException(400, 'The email entered was not found in our records.');
        }

        try {
            DB::beginTransaction();

            $email      = $data['email'];
            $token      = $this->generateResetToken();
            $created_at = now();

            DB::table('password_resets')->updateOrInsert(
                compact('email'),
                compact('email', 'token', 'created_at')
            );

            Notification::route('mail', $email)
                ->notify(new ResetPasswordNotification($token));

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    protected function generateResetToken()
    {
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $token = "";

        for ($i = 0; $i < 6; $i++) {
            $token .= substr($chars, rand(0, strlen($chars)) - 1, 1);
        }

        if (DB::table('password_resets')->where('token', $token)->exists()) {
            return $this->generateResetToken();
        }

        return $token;
    }

    public function validateResetToken(array $data)
    {
        return DB::table('password_resets')
            ->where('email', $data['email'])
            ->where('token', $data['token'])
            ->exists();
    }

    public function updatePassword(string $email, string $token, string $password, array $relations = [])
    {

        if (!$this->validateResetToken(compact('email', 'token'))) {
            throw new AccountException(400, 'E-mail ou código inválidos.');
        }

        $user = $this->update(
            compact('password'),
            $this->model->where('email', $email)->firstOrFail()->id,
            $relations
        );

        $this->wipeResetToken($email);

        return $user;
    }

    protected function wipeResetToken(string $email)
    {
        try {
            DB::beginTransaction();

            DB::table('password_resets')->where('email', $email)->delete();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }

    public function is_admin($access_level_id)
    {
        return $access_level_id < 3;
    }
}

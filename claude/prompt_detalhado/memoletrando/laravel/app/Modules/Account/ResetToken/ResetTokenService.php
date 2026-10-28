<?php

namespace App\Modules\Account\ResetToken;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Encryption\DecryptException;
use Carbon\Carbon;
use Hash;

use App\Modules\Account\Users\User;

class ResetTokenService
{
	public function __construct(User $user)
	{
        $this->user = $user;
        $this->token_string = env('RESET_TOKEN_STRING', 'App\Modules@dev');
    }

    public function run()
    {
        $this->saveToken();

        return $this->response();
    }

    protected function response()
    {
        return [
            'email' => $this->user->email,
            'token' => $this->user->reset_token
        ];
    }

    protected function saveToken()
    {
        try {
            DB::beginTransaction();

            $this->user->reset_token = $this->generateToken(
                $this->user->email
            );

            $this->user->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }


        return $this->user;
    }

    protected function generateToken(string $email)
    {
        try {
            $timestamp = Carbon::now()->format('Y-m-d H:i:s');

            $encrypted = encrypt("$email#$timestamp#{$this->token_string}");
        } catch (\Exception $e) {
            throw $e;
        }


        return $encrypted;
    }

    public function resetPassword(string $token, string $password)
    {
        $this->getInfo($token);

        return $this->reset($password);
    }

    protected function reset(string $password)
    {
        try {
            DB::beginTransaction();

            $this->user->password    = $password;
            $this->user->reset_token = null;
            $this->user->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }


        return true;
    }

    protected function getInfo(string $token)
    {
        $this->checkToken($token);
        $this->decryptToken($token);
        $this->validateToken();
    }

    protected function decryptToken(string $token)
    {
        try {
            $info = explode('#', decrypt($token));

            $this->info = [
                'email'     => $info[0],
                'timestamp'    => $info[1],
                'token_string' => $info[2],
            ];
        } catch (DecryptException $e) {
            $this->invalidateToken();
        }
    }

    protected function checkToken(string $token)
    {
        if (!$this->user->reset_token == $token) {
            $this->invalidateToken();
        }
    }

    protected function validateToken()
    {
        if (!
        $this->validEmail()    &&
        $this->validTimestamp()   &&
        $this->validTokenString()
        ) {
            $this->invalidateToken();
        }
    }

    protected function validEmail()
    {
        return ($this->info['email'] == $this->user->email);
    }

    protected function validTimestamp()
    {
        $timestamp = Carbon::createFromFormat('Y-m-d H:i:s', $this->info['timestamp']);
        $now       = Carbon::now();

        return ($now->diffInHours($timestamp) < 24);
    }

    protected function validTokenString()
    {
        return ($this->info['token_string'] === $this->token_string);
    }

    protected function invalidateToken()
    {
        throw new InvalidResetTokenException;
    }
}

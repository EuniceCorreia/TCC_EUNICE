<?php

namespace App\Modules\Account\Auth;

use App\Modules\Account\AccountException;
use App\Modules\Account\Users\User;
use Auth;
use Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthService
{
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Realiza a autentiação
     *
     * @var array $data
     * @return bool
     */
    public function authenticate(array $data)
    {
        if ($this->attempt($data)) {
            return true;
        }

        return false;
    }

    /**
     * Realiza a tentativa de login
     *
     * @var array $data
     * @return bool
     */
    private function attempt(array $data)
    {
        $credential = [
            'username' => $data['username'],
            'password' => $data['password'],
            'active'   => true,
        ];

        if ($data['access_level_id']) {
            $credential['access_level_id'] = $data['access_level_id'];
        }

        return Auth::attempt(
            $credential,
            $data['remember'] ?? false
        );
    }

    public function getAuthUserId()
    {
        return Auth::check() ? Auth::id() : null;
    }

    public function authorizeAdminAction(string $password)
    {
        $auth_passwords = $this->getValidAuthorizationPasswords();

        foreach ($auth_passwords as $auth_password) {
            if (Hash::check($password, $auth_password)) {
                return true;
            }
        }

        return false;
    }

    private function getValidAuthorizationPasswords()
    {
        $passwords = [];

        $users = $this->model->where('active', 1)->get();

        foreach ($users as $user) {
            if ($user->can('authorize', User::class)) {
                $passwords[] = $user->password;
            }
        }

        return $passwords;
    }

    public function identify(string $username)
    {
        try {
            $user = $this->model->where('active', 1)->where('username', $username)->firstOrFail();

            $permissions = $this->parsePermissions($user);
            $user_id     = $user->id;

            $response = compact('user_id', 'permissions');

            if ($user->super_admin == true) {
                $response['super_admin'] = true;
            }

        } catch (ModelNotFoundException $e) {
            throw new AccountException(404, "Usuário não encontrado.");
        }

        return $response;
    }

    public static function getPermissions()
    {
        $data['permissions'] = with(new self(new User))->parsePermissions(Auth::user());
        if (Auth::user()->super_admin == true) {
            $data['super_admin'] = true;
        }

        return $data;
    }

    private function parsePermissions(User $user)
    {
        $user->load('permissions.category');

        $permissions = $user->permissions;
        foreach ($permissions as $permission) {
            $permission->makeHidden(['id', 'user_permission_category_id', 'name']);

            $category          = $permission->category->type;
            $permission->allow = $permission->pivot->allow;

            unset($permission->pivot);
            unset($permission->category);

            $permission->category = $category;
        }

        return $permissions;
    }

    public function checkAccess($id, string $type, string $category)
    {
        $user = $this->model->find($id);

        if (empty($user)) {
            return false;
        }

        $permission = $user->permissions()
            ->where('type', $type)
            ->whereHas('category', function ($query) use ($category) {
                $query->where('type', $category);
            })
            ->first();

        if (empty($permission)) {
            return false;
        }

        return $permission->pivot->allow;
    }
}

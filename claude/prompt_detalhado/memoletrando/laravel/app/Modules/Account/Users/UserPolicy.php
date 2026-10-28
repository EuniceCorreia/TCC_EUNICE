<?php

namespace App\Modules\Account\Users;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class UserPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'users');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'users');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'users');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'users');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'users');
    }

    public function authorize(User $user)
    {
       return $this->can($user, 'authorize', 'misc');
    }
}

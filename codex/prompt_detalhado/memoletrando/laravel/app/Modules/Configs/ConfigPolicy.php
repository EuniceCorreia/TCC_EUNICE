<?php

namespace App\Modules\Configs;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class ConfigPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'configs');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'configs');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'configs');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'configs');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'configs');
    }
}

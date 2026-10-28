<?php

namespace App\Modules\Account\Permissions\AccessLevels;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class AccessLevelPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'access_levels');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'access_levels');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'access_levels');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'access_levels');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'access_levels');
    }
}

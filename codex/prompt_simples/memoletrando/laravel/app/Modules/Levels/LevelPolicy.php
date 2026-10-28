<?php

namespace App\Modules\Levels;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class LevelPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'levels');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'levels');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'levels');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'levels');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'levels');
    }
}

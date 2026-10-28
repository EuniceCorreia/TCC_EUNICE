<?php

namespace App\Modules\Themes;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class ThemePolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'themes');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'themes');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'themes');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'themes');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'themes');
    }
}

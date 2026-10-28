<?php

namespace App\Modules\Images;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class ImagePolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'images');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'images');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'images');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'images');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'images');
    }
}

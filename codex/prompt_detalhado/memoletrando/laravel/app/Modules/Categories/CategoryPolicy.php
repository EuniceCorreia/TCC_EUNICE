<?php

namespace App\Modules\Categories;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class CategoryPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'categories');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'categories');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'categories');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'categories');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'categories');
    }
}

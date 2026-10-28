<?php

namespace App\Modules\Base;

use Illuminate\Foundation\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BasePolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if ($user->super_admin) {
            return true;
        }

        return null;
    }

    protected function can(User $user, string $type, string $category)
    {
        if (empty($user->access_level)) {
            return false;
        }

        $permission = $user->access_level->permissions()
        ->where('type', $type)
        ->whereHas('category', function($query) use ($category) {
            $query->where('type', $category);
        })
        ->first();

        if (empty($permission)) {
            return false;
        }

        return $permission->pivot->allow;
    }
}

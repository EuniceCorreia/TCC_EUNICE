<?php

namespace App\Modules\GameResults;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class GameResultPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'game_results');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'game_results');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'game_results');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'game_results');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'game_results');
    }
}

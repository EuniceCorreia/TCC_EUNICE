<?php

namespace App\Modules\GameEvents;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class GameEventPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'game_events');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'game_events');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'game_events');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'game_events');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'game_events');
    }
}

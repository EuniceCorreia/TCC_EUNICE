<?php

namespace App\Modules\GameFigures;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class GameFigurePolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'game_figures');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'game_figures');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'game_figures');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'game_figures');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'game_figures');
    }
}

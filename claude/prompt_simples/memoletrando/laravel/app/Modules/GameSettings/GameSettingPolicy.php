<?php

namespace App\Modules\GameSettings;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class GameSettingPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'game_settings');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'game_settings');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'game_settings');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'game_settings');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'game_settings');
    }
}

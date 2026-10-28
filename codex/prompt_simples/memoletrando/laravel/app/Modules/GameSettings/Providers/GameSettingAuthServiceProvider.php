<?php

namespace App\Modules\GameSettings\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class GameSettingAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\GameSettings\GameSetting' => 'App\Modules\GameSettings\GameSettingPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

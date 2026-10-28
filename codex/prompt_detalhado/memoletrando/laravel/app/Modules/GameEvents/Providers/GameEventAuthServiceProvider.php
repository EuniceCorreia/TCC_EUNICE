<?php

namespace App\Modules\GameEvents\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class GameEventAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\GameEvents\GameEvent' => 'App\Modules\GameEvents\GameEventPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

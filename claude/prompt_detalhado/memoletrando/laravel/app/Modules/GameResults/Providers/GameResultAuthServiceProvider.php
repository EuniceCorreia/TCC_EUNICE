<?php

namespace App\Modules\GameResults\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class GameResultAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\GameResults\GameResult' => 'App\Modules\GameResults\GameResultPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

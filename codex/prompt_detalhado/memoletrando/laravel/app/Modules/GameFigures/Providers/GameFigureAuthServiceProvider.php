<?php

namespace App\Modules\GameFigures\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class GameFigureAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\GameFigures\GameFigure' => 'App\Modules\GameFigures\GameFigurePolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

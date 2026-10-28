<?php

namespace App\Modules\Levels\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class LevelAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Levels\Level' => 'App\Modules\Levels\LevelPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

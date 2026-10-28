<?php

namespace App\Modules\Configs\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class ConfigAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Configs\Config' => 'App\Modules\Configs\ConfigPolicy',
    ];

    public function register()
    {
        $this->registerPolicies();
    }
}

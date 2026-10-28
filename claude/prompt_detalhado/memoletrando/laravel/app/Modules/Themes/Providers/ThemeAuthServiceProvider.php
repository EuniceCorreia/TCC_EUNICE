<?php

namespace App\Modules\Themes\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class ThemeAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Themes\Theme' => 'App\Modules\Themes\ThemePolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

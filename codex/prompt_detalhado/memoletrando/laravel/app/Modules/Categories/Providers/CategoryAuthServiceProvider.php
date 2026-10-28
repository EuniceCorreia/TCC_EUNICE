<?php

namespace App\Modules\Categories\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class CategoryAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Categories\Category' => 'App\Modules\Categories\CategoryPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

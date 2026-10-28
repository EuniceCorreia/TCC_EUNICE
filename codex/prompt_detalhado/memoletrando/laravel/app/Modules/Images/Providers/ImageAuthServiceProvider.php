<?php

namespace App\Modules\Images\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class ImageAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Images\Image' => 'App\Modules\Images\ImagePolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

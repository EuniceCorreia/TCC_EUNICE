<?php

namespace App\Modules\Account\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class AccountAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Account\Permissions\AccessLevels\AccessLevel' => 'App\Modules\Account\Permissions\AccessLevels\AccessLevelPolicy',
        'App\Modules\Account\Users\User'                           => 'App\Modules\Account\Users\UserPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

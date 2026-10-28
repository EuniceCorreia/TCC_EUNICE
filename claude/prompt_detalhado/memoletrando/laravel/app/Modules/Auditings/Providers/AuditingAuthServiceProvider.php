<?php

namespace App\Modules\Auditings\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class AuditingAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Auditings\Auditing' => 'App\Modules\Auditings\AuditingPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}

<?php

namespace App\Modules\Account\Permissions\UserPermissions;

use App\Modules\Base\Services\ApiService;

class UserPermissionService
{
    public function __construct(UserPermission $model)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model);
    }
}

<?php

namespace App\Modules\Account\Permissions\UserPermissions;

use App\Modules\Base\Services\ApiService;

class UserPermissionCategoryService
{
    public function __construct(UserPermissionCategory $model)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model);
    }
}

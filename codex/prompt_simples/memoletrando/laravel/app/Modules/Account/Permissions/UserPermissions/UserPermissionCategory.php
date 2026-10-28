<?php

namespace App\Modules\Account\Permissions\UserPermissions;

use Illuminate\Database\Eloquent\Model;

class UserPermissionCategory extends Model
{
    public function permissions()
    {
        return $this->hasMany('App\Modules\Account\Permissions\UserPermissions\UserPermission');
    }
}

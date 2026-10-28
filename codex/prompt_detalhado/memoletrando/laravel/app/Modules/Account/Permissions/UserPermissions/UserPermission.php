<?php

namespace App\Modules\Account\Permissions\UserPermissions;

use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    public function category()
    {
        return $this->belongsTo('App\Modules\Account\Permissions\UserPermissions\UserPermissionCategory', 'user_permission_category_id');
    }
    
    public function users()
    {
        return $this->belongsToMany('App\Modules\Account\Users\User');
    }
}

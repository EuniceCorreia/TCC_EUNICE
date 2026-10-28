<?php

namespace App\Modules\Account\Permissions\AccessLevels;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccessLevel extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name', 'active'
    ];
    
    protected $casts = [
        'active' => 'boolean'
    ];
    
    public function permissions()
    {
        return $this
        ->belongsToMany('App\Modules\Account\Permissions\UserPermissions\UserPermission')
        ->using('App\Modules\Account\Permissions\UserPermissions\AccessLevelUserPermission')
        ->withPivot('allow')
        ->with('category');
    }
}

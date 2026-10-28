<?php

namespace App\Modules\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Account\Permissions\UserPermissions\UserPermissionService;

class UserPermissionController extends Controller
{
    public function __construct(UserPermissionService $permission_service)
    {
        $this->permission_service = $permission_service;
    }

    public function find(Request $request)
    {
        return response()->json([
            'error'           => false,
            'user_permission' => $this->permission_service->api->find($request->toArray()),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'            => false,
            'user_permissions' => $this->permission_service->api->get($request->toArray())
        ]);
    }
}

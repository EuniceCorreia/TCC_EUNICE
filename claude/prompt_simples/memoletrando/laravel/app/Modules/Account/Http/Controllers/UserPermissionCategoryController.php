<?php

namespace App\Modules\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Account\Permissions\UserPermissions\UserPermissionCategoryService;

class UserPermissionCategoryController extends Controller
{
    public function __construct(UserPermissionCategoryService $permission_category_service)
    {
        $this->permission_category_service = $permission_category_service;
    }

    public function find(Request $request)
    {
        return response()->json([
            'error'                    => false,
            'user_permission_category' => $this->permission_category_service->api->find($request->toArray()),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'                      => false,
            'user_permission_categories' => $this->permission_category_service->api->get($request->toArray()),
        ]);
    }
}

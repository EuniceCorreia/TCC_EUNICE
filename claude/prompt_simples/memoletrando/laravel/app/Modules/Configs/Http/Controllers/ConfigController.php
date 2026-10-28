<?php

namespace App\Modules\Configs\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Account\Permissions\AccessLevels\AccessLevelService;
use App\Modules\Account\Permissions\UserPermissions\AccessLevelUserPermission;
use App\Modules\Account\Permissions\UserPermissions\UserPermissionService;
use App\Modules\Configs\ConfigService;
use DB;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function __construct(ConfigService $config_service, UserPermissionService $user_permission_service, AccessLevelUserPermission $access_level_user_permission, AccessLevelService $access_level_service)
    {
        $this->config_service               = $config_service;
        $this->user_permission_service      = $user_permission_service;
        $this->access_level_user_permission = $access_level_user_permission;
        $this->access_level_service         = $access_level_service;
    }

    public function get(Request $request)
    {
        $config = $this->config_service::get();

        return response()->json([
            'error'  => false,
            'config' => $config,
        ], 200);
    }

    public function update(Request $request)
    {
        return response()->json([
            'error'   => false,
            'message' => 'Alterado com sucesso.',
            'config'  => $this->config_service->update($request->toArray()),
        ], 200);
    }

    public function new_access_level($category_name, $category_type, $unique_permission = null, $unique_name = null)
    {
        $user_permission_category_id = null;

        $_category = DB::table('user_permission_categories')->where('type', $category_type);

        if ($_category->count() && $unique_permission == null) {
            dd('Já existe uma permissão com o tipo -> ' . $category_type);
        }

        $types = [];

        if ($_category->count() == 0) {
            $category = DB::table('user_permission_categories')->insertGetId([
                'name' => $category_name,
                'type' => $category_type,
            ]);
        }

        $user_permission_category_id = ($_category->count() > 0) ? collect($_category->get())->first()->id : $category;

        if ($unique_permission != null) {
            if (DB::table('user_permissions')->where('type', $unique_permission)->where('user_permission_category_id', $user_permission_category_id)->count()) {
                dd('Já existe a permissão ' . $unique_name . ' nesta categoria');
            }
            $types[$unique_permission] = $unique_name;
            dump('Adicionado unique');
            dump($types);
        } else {
            $types = ['view' => 'view', 'create' => 'create', 'update' => 'update', 'delete' => 'delete'];
            dump('Adicionado padrões');
            dump($types);
        }

        $access_levels = $this->access_level_service->model->all();

        $this->store_access_level_types($user_permission_category_id, $types, $access_levels);

        dd('success');
    }

    public function store_access_level_types($category, $types, $access_levels)
    {
        foreach ($types as $type => $name) {
            $user_permission = DB::table('user_permissions')->insertGetId([
                'name'                        => $name,
                'type'                        => $type,
                'user_permission_category_id' => $category,
            ]);

            foreach ($access_levels as $al) {
                if (
                    DB::table('access_level_user_permission')
                    ->where('access_level_id', $al->id)
                    ->where('user_permission_id', $user_permission)->count()
                ) {
                    continue;
                }

                DB::table('access_level_user_permission')->insertGetId([
                    'access_level_id'    => $al->id,
                    'user_permission_id' => $user_permission,
                    'allow'              => 0,
                ]);
            }
        }
    }
}

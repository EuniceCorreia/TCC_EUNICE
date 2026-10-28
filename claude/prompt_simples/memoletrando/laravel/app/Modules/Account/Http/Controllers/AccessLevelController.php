<?php

namespace App\Modules\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Account\Http\Requests\AccessLevelRequest;
use App\Modules\Account\Permissions\AccessLevels\AccessLevelService;
use Illuminate\Http\Request;

class AccessLevelController extends Controller
{
    public function __construct(AccessLevelService $access_level_service)
    {
        $this->authorizeResource("App\Modules\Account\Permissions\AccessLevels\AccessLevel", "App\Modules\Account\Permissions\AccessLevels\AccessLevel");
        $this->access_level_service = $access_level_service;
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'find'     => 'view',
            'get'      => 'view',
            'paginate' => 'view',
            'restore'  => 'restore',
        ]);
    }

    public function store(AccessLevelRequest $request)
    {
        return response()->json([
            'error'        => false,
            'access_level' => $this->access_level_service->store($request->toArray()),
            'message'      => __('sg.account::toasts.access_levels.store'),
        ]);
    }

    public function update(AccessLevelRequest $request, $id)
    {
        return response()->json([
            'error'        => false,
            'access_level' => $this->access_level_service->update($request->toArray(), $id),
            'message'      => __('sg.account::toasts.access_levels.update'),
        ]);
    }

    public function destroy($id)
    {
        $this->access_level_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.account::toasts.access_levels.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->access_level_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.account::toasts.access_levels.restore'),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->access_level_service->api->paginate($request->toArray())
        );
    }

    public function find(Request $request)
    {
        return response()->json([
            'error'        => false,
            'access_level' => $this->access_level_service->api->find($request->toArray()),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'         => false,
            'access_levels' => $this->access_level_service->api->get($request->toArray()),
        ]);
    }
}

<?php

namespace App\Modules\Levels\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Levels\Http\Requests\LevelRequest;
use App\Modules\Levels\LevelService;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    public function __construct(LevelService $level_service)
    {
        // $this->authorizeResource("App\Modules\Levels\Level", "App\Modules\Levels\Level");
        $this->level_service = $level_service;
    }

    public function store(LevelRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.levels::toasts.store'),
            'level' => $this->level_service->store($request->toArray()),
        ]);
    }

    public function update(LevelRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.levels::toasts.update'),
            'level' => $this->level_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->level_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.levels::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->level_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.levels::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'levels' => $this->level_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'level' => $this->level_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->level_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore' => 'restore',
        ]);
    }
}

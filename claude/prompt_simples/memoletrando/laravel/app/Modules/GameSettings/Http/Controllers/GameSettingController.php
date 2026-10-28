<?php

namespace App\Modules\GameSettings\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\GameSettings\GameSettingService;
use App\Modules\GameSettings\Http\Requests\GameSettingRequest;
use Illuminate\Http\Request;

class GameSettingController extends Controller
{
    public function __construct(GameSettingService $game_setting_service)
    {
        // $this->authorizeResource("App\Modules\GameSettings\GameSetting", "App\Modules\GameSettings\GameSetting");
        $this->game_setting_service = $game_setting_service;
    }

    public function store(GameSettingRequest $request)
    {
        return response()->json([
            'error'        => false,
            'message'      => __('sg.game_settings::toasts.store'),
            'game_setting' => $this->game_setting_service->store($request->toArray()),
        ]);
    }

    public function update(GameSettingRequest $request, $id)
    {
        return response()->json([
            'error'        => false,
            'message'      => __('sg.game_settings::toasts.update'),
            'game_setting' => $this->game_setting_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->game_setting_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.game_settings::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->game_setting_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.game_settings::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'         => false,
            'game_settings' => $this->game_setting_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error'        => false,
            'game_setting' => $this->game_setting_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->game_setting_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore'    => 'restore',
        ]);
    }

    public function getSettingAndImages($id)
    {
        return response()->json([
            'error'         => false,
            'game_settings' => $this->game_setting_service->getSettingAndImages($id),
        ]);
    }
}

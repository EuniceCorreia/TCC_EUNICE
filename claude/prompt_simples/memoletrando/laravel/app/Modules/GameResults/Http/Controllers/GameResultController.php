<?php

namespace App\Modules\GameResults\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\GameResults\Http\Requests\GameResultRequest;
use App\Modules\GameResults\GameResultService;
use Illuminate\Http\Request;

class GameResultController extends Controller
{
    public function __construct(GameResultService $game_result_service)
    {
        // $this->authorizeResource("App\Modules\GameResults\GameResult", "App\Modules\GameResults\GameResult");
        $this->game_result_service = $game_result_service;
    }

    public function store(GameResultRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.game_results::toasts.store'),
            'game_result' => $this->game_result_service->store($request->toArray()),
        ]);
    }

    public function update(GameResultRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.game_results::toasts.update'),
            'game_result' => $this->game_result_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->game_result_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.game_results::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->game_result_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.game_results::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'game_results' => $this->game_result_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'game_result' => $this->game_result_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->game_result_service->api->paginate($request->toArray())
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

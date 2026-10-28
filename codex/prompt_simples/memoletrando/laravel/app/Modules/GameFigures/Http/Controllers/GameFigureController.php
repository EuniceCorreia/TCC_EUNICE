<?php

namespace App\Modules\GameFigures\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\GameFigures\Http\Requests\GameFigureRequest;
use App\Modules\GameFigures\GameFigureService;
use Illuminate\Http\Request;

class GameFigureController extends Controller
{
    public function __construct(GameFigureService $game_figure_service)
    {
        // $this->authorizeResource("App\Modules\GameFigures\GameFigure", "App\Modules\GameFigures\GameFigure");
        $this->game_figure_service = $game_figure_service;
    }

    public function store(GameFigureRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.game_figures::toasts.store'),
            'game_figure' => $this->game_figure_service->store($request->toArray()),
        ]);
    }

    public function update(GameFigureRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.game_figures::toasts.update'),
            'game_figure' => $this->game_figure_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->game_figure_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.game_figures::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->game_figure_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.game_figures::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'game_figures' => $this->game_figure_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'game_figure' => $this->game_figure_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->game_figure_service->api->paginate($request->toArray())
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

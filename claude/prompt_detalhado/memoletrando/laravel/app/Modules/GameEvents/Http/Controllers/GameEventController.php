<?php

namespace App\Modules\GameEvents\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\GameEvents\GameEventService;
use App\Modules\GameEvents\Http\Requests\GameEventMultipleRequest;
use App\Modules\GameEvents\Http\Requests\GameEventRequest;
use Illuminate\Http\Request;

class GameEventController extends Controller
{
    public function __construct(GameEventService $game_event_service)
    {
        // $this->authorizeResource("App\Modules\GameEvents\GameEvent", "App\Modules\GameEvents\GameEvent");
        $this->game_event_service = $game_event_service;
    }

    public function store(GameEventRequest $request)
    {
        return response()->json([
            'error'      => false,
            'message'    => __('sg.game_events::toasts.store'),
            'game_event' => $this->game_event_service->store($request->toArray()),
        ]);
    }

    public function update(GameEventRequest $request, $id)
    {
        return response()->json([
            'error'      => false,
            'message'    => __('sg.game_events::toasts.update'),
            'game_event' => $this->game_event_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->game_event_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.game_events::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->game_event_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.game_events::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'       => false,
            'game_events' => $this->game_event_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error'      => false,
            'game_event' => $this->game_event_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->game_event_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore'    => 'restore',
        ]);
    }

    public function saveMultiple(GameEventMultipleRequest $request)
    {
        return response()->json([
            'error'      => false,
            'message'    => __('sg.game_events::toasts.store'),
            'game_event' => $this->game_event_service->saveMultiple($request->toArray()),
        ]);
    }
}

<?php

namespace App\Modules\Themes\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Themes\Http\Requests\ThemeRequest;
use App\Modules\Themes\ThemeService;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    public function __construct(ThemeService $theme_service)
    {
        // $this->authorizeResource("App\Modules\Themes\Theme", "App\Modules\Themes\Theme");
        $this->theme_service = $theme_service;
    }

    public function store(ThemeRequest $request)
    {
        return response()->json([
            'error'   => false,
            'message' => __('sg.themes::toasts.store'),
            'theme'   => $this->theme_service->store($request->toArray()),
        ]);
    }

    public function update(ThemeRequest $request, $id)
    {
        return response()->json([
            'error'   => false,
            'message' => __('sg.themes::toasts.update'),
            'theme'   => $this->theme_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->theme_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.themes::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->theme_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.themes::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'  => false,
            'themes' => $this->theme_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'theme' => $this->theme_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->theme_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore'    => 'restore',
        ]);
    }

    public function saveOrder(Request $request)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.themes::toasts.update'),
            'theme'   => $this->theme_service->saveOrder($request->except('token')),
        ]);
    }
}

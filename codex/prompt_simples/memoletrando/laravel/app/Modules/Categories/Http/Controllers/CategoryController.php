<?php

namespace App\Modules\Categories\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Categories\Http\Requests\CategoryRequest;
use App\Modules\Categories\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(CategoryService $category_service)
    {
        // $this->authorizeResource("App\Modules\Categories\Category", "App\Modules\Categories\Category");
        $this->category_service = $category_service;
    }

    public function store(CategoryRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.categories::toasts.store'),
            'category' => $this->category_service->store($request->toArray()),
        ]);
    }

    public function update(CategoryRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('sg.categories::toasts.update'),
            'category' => $this->category_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->category_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.categories::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->category_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('sg.categories::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'categories' => $this->category_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'category' => $this->category_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->category_service->api->paginate($request->toArray())
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

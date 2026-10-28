<?php

namespace App\Modules\Images\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Images\Http\Requests\ImageRequest;
use App\Modules\Images\ImageService;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function __construct(ImageService $image_service)
    {
        // $this->authorizeResource("App\Modules\Images\Image", "App\Modules\Images\Image");
        $this->image_service = $image_service;
    }

    public function store(ImageRequest $request)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.images::toasts.store'),
            'image'   => $this->image_service->store($request->toArray()),
        ]);
    }

    public function update(ImageRequest $request, $id)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.images::toasts.update'),
            'image'   => $this->image_service->update($request->toArray(), $id),
        ]);
    }

    public function reorder(Request $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.images::toasts.update'),
            'images' => $this->image_service->reorder($request->except(['token'])),
        ]);
    }

    public function destroy($id)
    {
        $this->image_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.images::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->image_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.images::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'  => false,
            'images' => $this->image_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'image' => $this->image_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->image_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore'    => 'restore',
        ]);
    }

    public function uploat_to_temp(Request $request)
    {
        return response()->json(
            $this->image_service->upload_to_temp($request)
        );
    }
}

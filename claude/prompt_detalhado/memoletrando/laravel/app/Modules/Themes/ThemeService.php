<?php

namespace App\Modules\Themes;

use App\Modules\Base\Services\ApiService;
use App\Modules\Images\ImageService;
use Illuminate\Support\Facades\DB;

class ThemeService
{
    public function __construct(Theme $model, ImageService $image_service)
    {
        $this->model         = $model;
        $this->image_service = $image_service;
        $this->api           = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
        $this->thumbs        = [
            [
                'prefix' => 'thumb_',
                'width'  => 200,
                'height' => 200,
            ],
        ];
    }

    protected function getCustomFilters()
    {
        return [
            'main_categories' => function ($query, $key, $input) {
                return $query->withWhereHas('categories', function ($q) {
                    $q->where('main', 1);
                });
            },
        ];
    }

    protected function getCustomSorts()
    {
        return [
            // 'coluna' => function($query, $column, $order) {}
        ];
    }

    public function store(array $data)
    {

        try {
            DB::beginTransaction();

            $model = $this->model->create($data);

            if (isset($data['image']) && isset($data['image']['base64'])) {
                $this->store_image($data['image'], $model->id);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function update(array $data, $id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            $model->update($data);

            if (isset($data['image']) && isset($data['image']['base64'])) {
                $this->store_image($data['image'], $model->id);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id)->load('image');

            if (!empty($model->image)) {
                $this->image_service->destroy($model->image->id);
            }

            $model->delete();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function restore($id)
    {
        try {
            DB::beginTransaction();

            $this->model->onlyTrashed()->findOrFail($id)->restore();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function store_image(array $data, int $theme_id)
    {
        if ($data['base64']) {
            $data['imageable_id']   = $theme_id;
            $data['imageable_type'] = 'themes';
            $data['order']          = 0;
            $data['thumbs']         = $this->thumbs;

            $this->image_service->store($data);
        }
    }

    public function saveOrder(array $theme_ids)
    {
        try {
            DB::beginTransaction();

            if (count($theme_ids)) {
                foreach ($theme_ids as $index => $theme_id) {
                    $model = $this->model->findOrFail($theme_id);
                    $model->update(['order' => $index]);
                }
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }
}

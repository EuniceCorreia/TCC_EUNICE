<?php

namespace App\Modules\GameFigures;

use App\Modules\Base\Services\ApiService;
use App\Modules\Images\ImageService;
use Illuminate\Support\Facades\DB;

class GameFigureService
{
    public function __construct(GameFigure $model, ImageService $image_service)
    {
        $this->model         = $model;
        $this->api           = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
        $this->image_service = $image_service;
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
            // 'chave' => function($query, $key, $input) {}
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

            $model = $this->model->findOrFail($id);

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

    public function store_image(array $data, int $game_figure_id)
    {
        if ($data['base64']) {
            $data['imageable_id']   = $game_figure_id;
            $data['imageable_type'] = 'game_figures';
            $data['order']          = 0;
            $data['thumbs']         = $this->thumbs;

            $this->image_service->store($data);
        }
    }
}

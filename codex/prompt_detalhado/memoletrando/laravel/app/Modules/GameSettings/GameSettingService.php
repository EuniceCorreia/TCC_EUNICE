<?php

namespace App\Modules\GameSettings;

use App\Modules\Base\Services\ApiService;
use App\Modules\GameFigures\GameFigureService;
use Illuminate\Support\Facades\DB;

class GameSettingService
{
    public function __construct(GameSetting $model, GameFigureService $game_figure_service)
    {
        $this->model               = $model;
        $this->game_figure_service = $game_figure_service;
        $this->api                 = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
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

            $this->model->findOrFail($id)->delete();

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

    public function getSettingAndImages($game_setting_id = null)
    {
        try {
            if (empty($game_setting_id)) {
                throw new GameSettingException(404, 'ID do jogo não informado');
            }

            $game_setting = $this->model->findOrFail($game_setting_id)->load('category');

            if (empty($game_setting->quantity_images)) {
                throw new GameSettingException(404, 'Quantidade de Imagens para jogar não enontrada');
            }

            $array_category_ids = [];
            $this->getRecursiveCategoryIds($array_category_ids, $game_setting->category);

            $game_figures = $this->game_figure_service->model->where('active', 1)->where('level_id', $game_setting->level_id)->whereIn('category_id', $array_category_ids)->inRandomOrder()->take($game_setting->quantity_images)->get();

            if (count($game_figures) < $game_setting->quantity_images) {
                throw new GameSettingException(401, 'Não há a quantidade mínima de imagens cadastradas para jogar esse nível');
            }

        } catch (\Throwable $e) {
            throw $e;
        }

        return ['game_setting' => $game_setting, 'game_figures' => $game_figures];
    }

    public function getRecursiveCategoryIds(&$array_category_ids, $category)
    {
        if (empty($category)) {
            return;
        }

        $array_category_ids[] = $category->id;

        foreach ($category->categories as $_category) {
            if ($_category->count_game_figures) {
                $this->getRecursiveCategoryIds($array_category_ids, $_category);
            }
        }
    }

    public function saveMultiple($game_events)
    {
        try {
            foreach ($game_events as $game_event) {
                $this->store($game_event);
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        return true;
    }
}

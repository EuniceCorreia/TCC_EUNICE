<?php

namespace App\Modules\Account\Permissions\AccessLevels;

use Illuminate\Support\Facades\DB;
use App\Modules\Base\Services\ApiService;

class AccessLevelService
{
    public function __construct(AccessLevel $model)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model);
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $access_level = $this->model->create($data);

            if (!empty($data['permissions'])) {
                $this->syncPermissions($access_level, $data['permissions']);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }


        return $access_level;
    }

    public function update(array $data, int $id)
    {
        try {
            DB::beginTransaction();

            $access_level = $this->model->findOrFail($id);

            $access_level->update($data);

            if (!empty($data['permissions'])) {
                $this->syncPermissions($access_level, $data['permissions']);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }


        return $access_level;
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $access_level = $this->model->findOrFail($id);

            $access_level->delete();

            $deleted_at = $access_level->deleted_at->toDateTimeString();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }


        return $deleted_at;
    }

    public function restore($id)
    {
        try {
            DB::beginTransaction();

            $access_level = $this->model->onlyTrashed()->findOrFail($id);

            $access_level->restore();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }


        return true;
    }

    private function syncPermissions(AccessLevel $access_level, array $permissions)
    {
        $sync_data = [];
        foreach ($permissions as $permission) {
            $sync_data[$permission['id']] = [
                'allow' => $permission['pivot']['allow']
            ];
        }

        $access_level->permissions()->sync($sync_data);
    }

}

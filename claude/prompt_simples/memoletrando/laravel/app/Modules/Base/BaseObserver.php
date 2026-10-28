<?php

namespace App\Modules\Base;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class BaseObserver
{
    /**
    * Checa se foi alterada a coluna deleted_at do modelo e
    * se foram alterado somente 2 ou menos campos
    * (normalmente deleted_at e updated_at)
    *
    * @param Model $model
    * @return bool
    */
    protected function softDeleted(Model $model)
    {
        return (
            $model->isDirty($model->getDeletedAtColumn()) &&
            count($model->getDirty()) <= 2
        );
    }

    /**
    * Remove queries cacheadas do modelo.
    *
    * @param Model $model
    * @return null
    */
    protected function clearCache(Model $model)
    {
        $id    = $model->{$model->getKeyName()};
        $table = $model->getTable();

        Cache::forget("$table.array");
        Cache::forget("$table.count");
        Cache::forget("$table.get.$id");
    }

}

<?php

namespace App\Modules\Base\Services;

use Date;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\RelationNotFoundException;
use Illuminate\Support\Facades\DB;
use \Closure;

/**
 *
 */
class DataTableService
{
    private $model;
    private $relations;

    public function __construct(Model $model)
    {
        $this->model          = $model;
        $this->relations      = [];
        $this->soft_deleted   = false;
        $this->custom_filters = [];
        $this->custom_sorts   = [];
    }

    public function addCustomFilter(string $name, Closure $function)
    {
        $this->custom_filters[$name] = $function;
    }

    public function addCustomSort(string $name, Closure $function)
    {
        $this->custom_sorts[$name] = $function;
    }

    public function addRelation(string $relation)
    {
        if (!in_array($relation, $this->relations)) {
            $this->relations[] = $relation;
        }
    }

    public function removeRelation(string $relation)
    {
        foreach ($this->relations as $key => $existing_relation) {
            if ($existing_relation == $relation) {
                unset($this->relations[$key]);
            }
        }
    }

    public function get($data)
    {
        $this->setData($data);

        $query = $this->model->query();

        if ($this->soft_deleted && $this->modelHasSoftDelete()) {
            $query = $query->withTrashed();
        }

        $column = key($data['sorting']);
        $order = $data['sorting'][$column];
        $query = $this->order($query, $column, $order);

        $query = $this->insertRelations($query);

        $query = $this->filter($query, $data['filter'] ?? []);

        return $query->paginate($data['count']);
    }

    private function setData(&$data)
    {
        $this->setSoftDeleted($data);
        $this->setNullFilters($data);
        $this->setRelations($data);
    }

    private function setSoftDeleted(&$data)
    {
        $this->soft_deleted = (!empty($data['filter']['deleted']) && $data['filter']['deleted'] == 'true');
        unset($data['filter']['deleted']);
    }

    private function setRelations(&$data)
    {
        $this->relations = $data['relations'] ?? [];
        unset($data['relations']);
    }

    private function setNullFilters(&$data)
    {
        if (!empty($data['filter'])) {
            foreach ($data['filter'] as $filter) {
                if ($filter == 'null') {
                    $filter = null;
                }
            }
        }
    }

    private function order(Builder $query, $column, $order)
    {
        $column = urldecode($column);

        if ($this->columnIsCustomSort($column)) {
            $query = $this->customSort($query, $column, $order);
        } else if ($this->hasMultipleOrderBy($column)) {

            $columns = $this->serializeColumns($column);

            foreach ($columns as $column) {
                $query = $query->orderBy($column, $order);
            }

        } else {
            $query = $query->orderBy($column, $order);
        }

        return $query;
    }

    private function columnIsCustomSort($column)
    {
        return in_array($column, array_keys($this->custom_sorts));
    }

    private function customSort(Builder $query, string $column, string $order)
    {

        if (
            !empty($this->custom_sorts[$column]) &&
            $this->custom_sorts[$column] instanceof Closure
        ) {
            return $this->custom_sorts[$column]($query, $column, $order);
        }

    }

    private function hasMultipleOrderBy(string $columns)
    {
        return (strpos($columns, ',') !== false);
    }

    private function serializeColumns(string $columns)
    {
        return explode(',', $columns);
    }

    private function filter(Builder $query, array $filters = [])
    {

        if (!empty($filters)) {
            foreach ($filters as $k => $input) {
                $input = rawurldecode($input);
                $k = rawurldecode($k);

                if ($this->keyIsCustomFilter($k)) {
                    $query = $this->customFilter($query, $k, $input);
                } else if ($this->keyIsRelationException($k)) {
                    $query = $this->hasNot($query, substr($k, 1), $input);
                } else if ($this->keyIsRelation($k)) {
                    $query = $this->relationQuery($query, $k, $input);
                } else if ($this->keyIsConditionalRelation($k)) {
                    $query = $this->conditionalRelationQuery($query, $k, $input);
                } else if ($this->columnIs('date', $k)) {
                    $date = Date::dmyDateFilter($input, '/');
                    $query->where($k, 'like', '%' . $date . '%');
                } else if ($this->columnIsPrimaryKey($k)) {
                    $query = $this->where($query, $k, $input);
                } else if ($input == 'null' || $input == null) {
                    $query = $this->whereNull($query, $k);
                } else {
                    $query = $this->whereLike($query, $k, $input);
                }
            }
        }

        return $query;
    }

    private function keyIsCustomFilter($key)
    {
        return in_array($key, array_keys($this->custom_filters));
    }

    private function customFilter(Builder $query, string $key, string $input)
    {

        if (
            !empty($this->custom_filters[$key]) &&
            $this->custom_filters[$key] instanceof Closure
        ) {
            return $this->custom_filters[$key]($query, $key, $input);
        }

    }

    private function relationQuery(Builder $query, $k, $input)
    {
        if ($this->hasOrOperator($k)) {
            $relations = $this->serializeOrOperatorRelation($k);
            $relation_one = $relations[0];
            $relation_two = $relations[1];
            $query = $this->whereHas($query, $relation_one[0], $relation_one[1], $input);
            $query = $this->orWhereHas($query, $relation_two[0], $relation_two[1], $input);
        } else {
            $relation = $this->serializeRelation($k);
            $key = $relation[0];
            $value = $relation[1];
            $query = $this->whereHas($query, $key, $value, $input);
        }

        return $query;
    }

    private function conditionalRelationQuery(Builder $query, $k, $input)
    {
        if (!$this->hasOrOperator($k)) {

            return $this->insertConditionalRelation(
                $query,
                $this->serializeConditionalRelation($k),
                $input
            );

        }

        $relations = $this->serializeOrOperatorConditionalRelation($k);

        foreach ($relations as $relation) {
            $query = $this->insertConditionalRelation(
                $query, $relation, $input
            );
        }

        return $query;
    }

    private function keyIsRelation($key)
    {
        return (
            strpos($key, '.') !== false &&
            substr($key, 0, 1) != '#'
        );
    }

    private function keyIsConditionalRelation($key)
    {
        return (
            strpos($key, '.') !== false &&
            substr($key, 0, 1) == '#'
        );
    }

    private function hasOrOperator($key)
    {
        return strpos($key, '||') !== false;
    }

    private function serializeRelation($key)
    {
        return explode('.', $key);
    }

    private function serializeOrOperatorRelation($key)
    {
        return array_map(function ($item) {

            return explode('.', $item);

        }, explode('||', rawurldecode($key)));
    }

    private function serializeConditionalRelation($key)
    {
        return explode('.', substr($key, 1));
    }

    private function serializeOrOperatorConditionalRelation($key)
    {
        return array_map(function ($item) {

            return explode('.', substr($item, 1));

        }, explode('||', rawurldecode($key)));
    }

    private function insertConditionalRelation(Builder $query, $relation, $input)
    {
        try {

            $count = count($relation);

            if ($count == 2) {
                $relation_name = $relation[0];
                $field = $relation[1];

                $query = $query->with([$relation_name => function ($q) use ($field, $input) {
                    $q->where($field, 'like', $input);
                }]);
            } else if ($count == 3) {
                $relation_name = $relation[0];
                $relation_relation = $relation[1];
                $field = $relation[2];

                $query = $query->with([$relation_name => function ($q) use ($relation_relation, $field, $input) {
                    $q->whereHas($relation_relation, function ($qr) use ($field, $input) {
                        $qr->where($field, 'like', '%' . $input . '%');
                    });
                }]);
            }
        } catch (RelationNotFoundException $e) {
            $message = $e->getMessage();
            \Log::warning("Tentou carregar relação não existente [$message]");
        }

        return $query;
    }

    private function insertRelations(Builder $query)
    {
        if (!empty($this->relations)) {
            try {
                $query = call_user_func_array([$query, 'with'], $this->relations);
            } catch (RelationNotFoundException $e) {
                $message = $e->getMessage();
                \Log::warning("Tentou carregar relação não existente [$message]");
            }
        }

        return $query;
    }

    private function modelHasSoftDelete()
    {
        return in_array(
            'Illuminate\Database\Eloquent\SoftDeletes',
            class_uses($this->model)
        );
    }

    private function columnIs(string $type, string $column)
    {
        return (
            DB::getSchemaBuilder()->getColumnType($this->model->getTable(), $column) === $type
        );
    }

    private function columnIsPrimaryKey(string $column)
    {
        return ($this->model->getKeyName() === $column);
    }

    private function booleanString(Builder $query, string $key, string $value, array $strings)
    {
        $matched = 0;
        foreach ($strings as $string => $db_value) {
            $pos = stripos($string, $value);
            if ($pos !== false) {
                $query = $matched == 0 ?
                $query->where($key, $db_value) :
                $query->orWhere($key, $db_value);
                $matched++;
            }
        }

        if (empty($matched)) {
            return $query->where($key, null);
        }

        return $query;
    }

    private function whereHas(Builder $query, $key, $value, $input)
    {
        return $query->whereHas($key, function ($q) use ($key, $input, $value) {
            $q->where($value, 'like', '%' . $input . '%');
        });
    }

    private function orWhereHas(Builder $query, $key, $value, $input)
    {
        return $query->orWhereHas($key, function ($q) use ($key, $input, $value) {
            $q->where($value, 'like', '%' . $input . '%');
        });
    }

    private function whereLike(Builder $query, $key, $input)
    {
        return $query->where($key, 'like', '%' . $input . '%');
    }

    private function where(Builder $query, $key, $input)
    {
        return $query->where($key, $input);
    }

    private function whereNull(Builder $query, $key)
    {
        return $query->whereNull($key);
    }

    private function keyIsRelationException(string $key)
    {
        return ($key[0] == '!');
    }

    private function hasNot(Builder $query, string $relation, $value = true)
    {
        if (!$value) {
            return $query;
        }

        return $query->has($relation, '<', 1);
    }
}

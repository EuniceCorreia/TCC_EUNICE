<?php

namespace App\Modules\Base\Services;

use App\Modules\Base\Services\DataTableService;
use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\RelationNotFoundException;

class ApiService
{
    protected $invalid_constraints = [
        'skip', 'take', 'orderBy', 'token', 'has',
    ];

    protected $reserved_keywords = [
        'has',
        'skip',
        'take',
        'orderBy',
        'token',
    ];

    public function __construct(Model $model, array $custom_filters = [], array $custom_sorts = [])
    {
        $this->model          = $model;
        $this->custom_filters = $custom_filters;
        $this->custom_sorts   = $custom_sorts;
    }

    public function get(array $data = [])
    {
        $wheres    = $data['wheres'] ?? [];
        $relations = $data['relations'] ?? [];
        $select    = $data['select'] ?? [];

        if (isset($data['paginate']) && $data['paginate'] === 'true') {
            $take = isset($data['take']) ? $data['take'] : 15;
            return $this->buildQuery($wheres, $relations, $select)->paginate($take);
        }

        return $this->buildQuery($wheres, $relations, $select)->get();
    }

    public function find(array $data = [])
    {
        $wheres    = $data['wheres'] ?? [];
        $relations = $data['relations'] ?? [];
        $select    = $data['select'] ?? [];

        return $this->buildQuery($wheres, $relations, $select)->firstOrFail();
    }

    public function paginate(array $data)
    {
        $data_table_service = new DataTableService($this->model);

        if (!empty($this->custom_filters)) {
            foreach ($this->custom_filters as $name => $closure) {
                $data_table_service->addCustomFilter($name, $closure);
            }
        }

        if (!empty($this->custom_sorts)) {
            foreach ($this->custom_sorts as $name => $closure) {
                $data_table_service->addCustomSort($name, $closure);
            }
        }

        return $data_table_service->get($data);
    }

    protected function buildQuery(array $wheres = [], array $relations = [], array $select = [])
    {
        $query = $this->model;

        $query = $this->with($query, $relations);

        $this->insertQueryConstraints($query, $wheres);

        $this->insertQueryResultParameters($query, $wheres);

        if (!empty($select)) {
            $query = $query->select($select);
        }

        return $query;
    }

    protected function insertQueryConstraints(&$query, $wheres)
    {
        foreach ($wheres as $key => $value) {

            if ($value == 'null') {
                $value = null;
            }

            if ($this->keyIsCustomFilter($key)) {
                $query = $this->applyCustomFilter($query, $key, $value);
            } else if ($key === 'has') {
                $query = $query->whereHas($value);
            } else if (in_array($key, $this->invalid_constraints)) {
                continue;
            } else if ($this->isRelation($key)) {
                $query = $this->relationQuery($query, $key, $value);
            } else if ($this->isComparator($key)) {
                $comparator = $this->parseComparator($key);
                $operator   = $this->parseOperator($key);

                $query = $query->where($comparator, $operator, $value);
            } else if (is_array($value)) {
                $query = $query->whereIn($key, $value);
            } else {
                if ($this->isLike(($value))) {
                    $query = $query->where($key, 'like', $value);
                } else {
                    $query = $query->where($key, $value);
                }
            }
        }
    }

    protected function insertQueryResultParameters(&$query, $wheres)
    {
        foreach ($wheres as $key => $value) {
            if ($key === 'skip') {
                $query = $query->skip($value);
            } else if ($key === 'take') {
                $query = $query->take($value);
            } else if ($key === 'orderBy') {
                if ($this->keyIsCustomSort($key)) {
                    $query = $this->applyCustomSort($query, $key, $value);
                } else if ($this->isArray($value)) {
                    foreach (explode(',', $value) as $order_by) {
                        $parsed_orderby = $this->parseOrderBy($order_by);
                        $query          = $query->orderBy($parsed_orderby['value'], $parsed_orderby['direction']);
                    }
                } else {
                    $parsed_orderby = $this->parseOrderBy($value);
                    $query          = $query->orderBy($parsed_orderby['value'], $parsed_orderby['direction']);
                }
            }
        }

        return $query;
    }

    private function keyIsCustomFilter($key)
    {
        return in_array($key, array_keys($this->custom_filters));
    }

    private function applyCustomFilter($query, string $key, $input)
    {
        if (
            !empty($this->custom_filters[$key]) &&
            $this->custom_filters[$key] instanceof Closure
        ) {
            return $this->custom_filters[$key]($query, $key, $input);
        }

        return $query;
    }

    private function keyIsCustomSort($key)
    {
        return in_array($key, array_keys($this->custom_sorts));
    }

    protected function isArray(string $value)
    {
        return (strpos($value, ',') !== false);
    }

    protected function applyCustomSort(Builder $query, string $column, $value)
    {
        if (
            !empty($this->custom_sorts[$column]) &&
            $this->custom_sorts[$column] instanceof Closure
        ) {
            return $this->custom_sorts[$column]($query, $column);
        }

    }

    public function load($model, array $relations = [])
    {
        if (!empty($relations)) {
            try {
                $model = call_user_func_array([$model, 'load'], $relations);
            } catch (RelationNotFoundException $e) {
                $message = $e->getMessage();
                \Log::warning("Tentou carregar relação não existente [$message]");
            }
        }

        return $model;
    }

    public function with($model, array $relations = [])
    {
        if (!empty($relations)) {
            try {
                $model = call_user_func_array([$model, 'with'], $relations);
            } catch (RelationNotFoundException $e) {
                $message = $e->getMessage();
                \Log::warning("Tentou carregar relação não existente [$message]");
            }
        }

        return $model;
    }

    public function count(array $wheres = [])
    {
        $query = $this->model;

        $query = $this->insertQueryConstraints($query, $wheres);

        return $query->count();
    }

    protected function parseOrderBy(string $value)
    {
        if (substr($value, 0, 1) === '!') {
            return ['value' => substr($value, 1, strlen($value)), 'direction' => 'desc'];
        }

        return ['value' => $value, 'direction' => 'asc'];
    }

    protected function isComparator(string $key)
    {
        $token = substr($key, 0, 1);

        return ($token == '<' || $token == '>');
    }

    protected function parseOperator(string $key)
    {
        $token = substr($key, 0, 1);

        if ($token == '<' || $token == '>') {

            $double_token = substr($key, 0, 2);

            if ($double_token == '<=' || $double_token == '>=') {
                return $double_token;
            }

            return $token;

        }
    }

    protected function parseComparator(string $key)
    {
        return substr($key, strlen($this->parseOperator($key)));
    }

    protected function isLike($value)
    {
        if (!is_string($value)) {
            return false;
        }

        return ($value[0] == '%' && $value[strlen($value) - 1] == '%');
    }

    private function isRelation($key)
    {
        return (
            strpos($key, '.') !== false &&
            substr($key, 0, 1) != '#'
        );
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

    private function relationQuery($query, $k, $input)
    {
        if ($this->hasOrOperator($k)) {
            $relations    = $this->serializeOrOperatorRelation($k);
            $relation_one = $relations[0];
            $relation_two = $relations[1];
            $query        = $this->whereHas($query, $relation_one[0], $relation_one[1], $input);
            $query        = $this->orWhereHas($query, $relation_two[0], $relation_two[1], $input);
        } else {
            $relation = $this->serializeRelation($k);
            $key      = $relation[0];
            $value    = $relation[1];
            $query    = $this->whereHas($query, $key, $value, $input);
        }

        return $query;
    }

    private function hasOrOperator($key)
    {
        return strpos($key, '||') !== false;
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
}

<?php

namespace App\Modules\Base\Utilities;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtilityService
{
    public function verifyCNPJ(string $value, array $tables = [], string $column = 'cnpj')
    {
        foreach ($tables as $table) {
            if ($this->exists($table, $column, $value)) {
                throw new UtilityException(422, 'O CNPJ inserido já existe.');
            }
        }

        return true;
    }

    /**
     * Checa se a tabela contém uma coluna com o valor inserido
     *
     * @param string $table
     * @param string $column
     * @param mixed $value
     * @return bool
     */
    public function exists(string $table, string $column, $value)
    {
        return DB::table($table)->where($column, $value)->exists();
    }
}
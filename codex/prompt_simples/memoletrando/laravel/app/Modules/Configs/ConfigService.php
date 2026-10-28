<?php

namespace App\Modules\Configs;

use Illuminate\Support\Facades\DB;

class ConfigService
{
    public function __construct(Config $model)
    {
        $this->model = $model;
    }

    public static function get($key = null)
    {
        if (empty($key)) {
            return Config::all()->pluck('value', 'key')->toArray();
        } else if (is_array($key)) {
            return Config::whereIn('key', $key)->pluck('value', 'key')->toArray();
        } else {
            return Config::where('key', $key)->first()->value ?? null;
        }
    }

    public function update(array $data)
    {
        try {
            DB::beginTransaction();

            foreach ($data as $key => $value) {
                Config::where('key', $key)->update(['value' => $value]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return $this->get();
    }
}

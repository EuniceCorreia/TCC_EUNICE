<?php

namespace App\Modules\ModuleGenerator;

use Illuminate\Support\ServiceProvider;

class ModuleGeneratorServiceProvider extends ServiceProvider
{
    protected $commands = [
        'App\Modules\ModuleGenerator\ModuleGenerator',
    ];

    public function register()
    {
        $this->commands($this->commands);
    }
}

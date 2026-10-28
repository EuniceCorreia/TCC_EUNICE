<?php

namespace App\Modules\Configs\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ConfigServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.configs');

        // Route::middleware('web')
        //     ->prefix('sistema')
        //     ->namespace('App\Modules\Configs\Http\Controllers')
        //     ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api'])
            ->prefix('api')
            ->namespace('App\Modules\Configs\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');
    }

    public function register()
    {
        $this->app->register(ConfigEventServiceProvider::class);
        $this->app->register(ConfigAuthServiceProvider::class);
    }
}

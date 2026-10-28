<?php

namespace App\Modules\Levels\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class LevelServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'sg.levels');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'levels' => 'App\Modules\Levels\Level',
        ]);
    }

    public function register()
    {
        $this->app->register(LevelEventServiceProvider::class);
        $this->app->register(LevelAuthServiceProvider::class);
    }
}

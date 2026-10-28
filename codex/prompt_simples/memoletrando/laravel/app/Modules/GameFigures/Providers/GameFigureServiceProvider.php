<?php

namespace App\Modules\GameFigures\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class GameFigureServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'sg.game_figures');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'game_figures' => 'App\Modules\GameFigures\GameFigure',
        ]);
    }

    public function register()
    {
        $this->app->register(GameFigureEventServiceProvider::class);
        $this->app->register(GameFigureAuthServiceProvider::class);
    }
}

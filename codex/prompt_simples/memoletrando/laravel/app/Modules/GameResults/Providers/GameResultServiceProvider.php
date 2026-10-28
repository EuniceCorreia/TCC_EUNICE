<?php

namespace App\Modules\GameResults\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class GameResultServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'sg.game_results');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'game_results' => 'App\Modules\GameResults\GameResult',
        ]);
    }

    public function register()
    {
        $this->app->register(GameResultEventServiceProvider::class);
        $this->app->register(GameResultAuthServiceProvider::class);
    }
}

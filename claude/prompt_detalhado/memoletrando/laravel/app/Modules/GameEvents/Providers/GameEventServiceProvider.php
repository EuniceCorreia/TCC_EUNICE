<?php

namespace App\Modules\GameEvents\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class GameEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'sg.game_events');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'game_events' => 'App\Modules\GameEvents\GameEvent',
        ]);
    }

    public function register()
    {
        $this->app->register(GameEventEventServiceProvider::class);
        $this->app->register(GameEventAuthServiceProvider::class);
    }
}

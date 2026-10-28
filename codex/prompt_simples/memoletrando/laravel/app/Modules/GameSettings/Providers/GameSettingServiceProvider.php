<?php

namespace App\Modules\GameSettings\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class GameSettingServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'sg.game_settings');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'game_settings' => 'App\Modules\GameSettings\GameSetting',
        ]);
    }

    public function register()
    {
        $this->app->register(GameSettingEventServiceProvider::class);
        $this->app->register(GameSettingAuthServiceProvider::class);
    }
}

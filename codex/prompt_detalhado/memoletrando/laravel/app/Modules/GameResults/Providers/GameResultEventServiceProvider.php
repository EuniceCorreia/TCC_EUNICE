<?php

namespace App\Modules\GameResults\Providers;

use App\Modules\GameResults\GameResult;
use App\Modules\GameResults\GameResultObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class GameResultEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}

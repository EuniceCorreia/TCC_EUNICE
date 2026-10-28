<?php

namespace App\Modules\GameEvents\Providers;

use App\Modules\GameEvents\GameEvent;
use App\Modules\GameEvents\GameEventObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class GameEventEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}

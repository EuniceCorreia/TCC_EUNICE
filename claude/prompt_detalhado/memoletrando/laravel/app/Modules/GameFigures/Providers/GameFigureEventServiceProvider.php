<?php

namespace App\Modules\GameFigures\Providers;

use App\Modules\GameFigures\GameFigure;
use App\Modules\GameFigures\GameFigureObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class GameFigureEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}

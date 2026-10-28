<?php

namespace App\Modules\Levels\Providers;

use App\Modules\Levels\Level;
use App\Modules\Levels\LevelObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class LevelEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}

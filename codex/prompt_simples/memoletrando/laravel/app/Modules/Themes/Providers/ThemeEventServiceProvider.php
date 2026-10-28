<?php

namespace App\Modules\Themes\Providers;

use App\Modules\Themes\Theme;
use App\Modules\Themes\ThemeObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class ThemeEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}

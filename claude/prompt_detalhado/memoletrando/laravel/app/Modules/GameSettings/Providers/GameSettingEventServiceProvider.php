<?php

namespace App\Modules\GameSettings\Providers;

use App\Modules\GameSettings\GameSetting;
use App\Modules\GameSettings\GameSettingObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class GameSettingEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}

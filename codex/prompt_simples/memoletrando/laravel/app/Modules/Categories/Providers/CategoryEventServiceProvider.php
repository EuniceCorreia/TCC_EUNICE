<?php

namespace App\Modules\Categories\Providers;

use App\Modules\Categories\Category;
use App\Modules\Categories\CategoryObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class CategoryEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}

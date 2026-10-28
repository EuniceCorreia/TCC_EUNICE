<?php

namespace App\Modules\Base;

use Illuminate\Database\Eloquent\Factory;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use ReflectionClass;

class BaseServiceProvider extends ServiceProvider
{
    protected $name = 'sg.base';

    protected $namespace = 'App';

    protected $api_prefix = 'api';

    protected $web_prefix = 'sistema';

    public function boot()
    {
        $this->setDirectory();

        $this->bootTranslations();
        $this->bootMigrations();
        $this->bootFactories();
        $this->bootViews();
        $this->bootRelations();
        $this->bootPublishables();
        $this->bootWebRoutes();
        $this->bootApiRoutes();
    }

    private function setDirectory()
    {
        $this->path = dirname(
            with(
                new ReflectionClass(get_class($this))
            )->getFileName()
        );
    }

    protected function bootTranslations()
    {
        $path = "{$this->path}/../resources/lang";

        if (file_exists($path)) {
            $this->loadTranslationsFrom($path, $this->name);
        }
    }

    protected function bootMigrations()
    {
        $path = "{$this->path}/../database/migrations";

        if (file_exists($path)) {
            $this->loadMigrationsFrom($path);
        }
    }

    protected function bootFactories()
    {
        $path = "{$this->path}/../database/factories";

        if (file_exists($path)) {
            $this->app->make(Factory::class)->load($path);
        }
    }

    protected function bootViews()
    {
        $path = "{$this->path}/../resources/views";

        if (file_exists($path)) {
            $this->loadViewsFrom($path, $this->name);
        }
    }

    protected function bootRelations()
    {
        if (!empty($this->relations)) {
            Relation::morphMap($this->relations);
        }
    }

    protected function bootPublishables()
    {
        $path = "{$this->path}/../publishable";

        if (file_exists($path)) {
            $this->publishes([
                $path => app_path($this->publish_path ?? ''),
            ], $this->name);
        }
    }

    protected function bootWebRoutes()
    {
        $path = "{$this->path}/../routes/web.php";

        if (file_exists($path)) {
            Route::middleware('web')
                ->prefix($this->web_prefix)
                ->namespace("{$this->namespace}\Http\Controllers")
                ->group($path);
        }
    }

    protected function bootApiRoutes()
    {
        $path = "{$this->path}/../routes/api.php";

        if (file_exists($path)) {
            Route::middleware('api')
                ->prefix($this->api_prefix)
                ->namespace("{$this->namespace}\Http\Controllers")
                ->group($path);
        }
    }

    public function register()
    {
        if (!empty($this->providers)) {

            foreach ($this->providers as $provider) {
                $this->app->register($provider);
            }

        }
    }
}

<?php

namespace App\Modules\ModuleGenerator;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use App\Modules\ModuleGenerator\Templates\ApiRoutes\ApiRoutesTemplate;
use App\Modules\ModuleGenerator\Templates\AuthServiceProvider\AuthServiceProviderTemplate;
use App\Modules\ModuleGenerator\Templates\Controller\ControllerTemplate;
use App\Modules\ModuleGenerator\Templates\EventServiceProvider\EventServiceProviderTemplate;
use App\Modules\ModuleGenerator\Templates\Exception\ExceptionTemplate;
use App\Modules\ModuleGenerator\Templates\Model\ModelTemplate;
use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\Policy\PolicyTemplate;
use App\Modules\ModuleGenerator\Templates\Request\RequestTemplate;
use App\Modules\ModuleGenerator\Templates\ServiceProvider\ServiceProviderTemplate;
use App\Modules\ModuleGenerator\Templates\Service\ServiceTemplate;
use App\Modules\ModuleGenerator\Templates\Toasts\ToastsTemplate;
use App\Modules\ModuleGenerator\Templates\WebRoutes\WebRoutesTemplate;

class ModuleGenerator extends Command
{
    /**
     * Nome e assinatura do comando
     *
     * @var string
     */
    protected $signature = 'module:generate {namespace} {name}';

    /**
     * Descrição do comando
     *
     * @var string
     */
    protected $description = 'Gera classes genéricas do laravel para utilização.';

    /**
     * Modelos de arquivos
     */
    private $templates = [];

    private $files = [];

    public function __construct()
    {
        $this->templates = [
            ModelTemplate::class,
            ServiceTemplate::class,
            // ObserverTemplate::class,
            PolicyTemplate::class,
            ExceptionTemplate::class,
            ServiceProviderTemplate::class,
            EventServiceProviderTemplate::class,
            AuthServiceProviderTemplate::class,
            ControllerTemplate::class,
            RequestTemplate::class,
            WebRoutesTemplate::class,
            ApiRoutesTemplate::class,
            ToastsTemplate::class,
            // AuditingMessagesTemplate::class,
        ];

        parent::__construct();
    }

    /**
     * Executa o comando.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $name      = $this->argument('name');
            $namespace = $this->argument('namespace');

            $this->startProgressBar();

            foreach ($this->templates as $template_class) {
                $this->generate(
                    new $template_class($name, $namespace)
                );
            }
            $error = false;
        } catch (\Throwable $e) {
            $this->undo();
            throw $e;
            $error = true;
        } finally {
            $this->finishResponse($error);
        }

        $this->clearCache();
    }

    private function startProgressBar()
    {
        $this->bar = $this->output->createProgressBar(count($this->templates));
        $this->bar->setFormat('verbose');
    }

    private function undo()
    {
        foreach ($this->files as $file) {

            if (is_file($file)) {
                unlink($file);
            }

        }
    }

    private function generate(ModuleTemplate $template)
    {
        $file = $template->make();

        $this->files[$template->getName()] = $file;

        $this->bar->advance();

        $this->line(" $file gerado com sucesso.");
    }

    private function finishResponse($with_errors)
    {
        switch (count($this->files)) {
            case 0:
                $this->line('Nenhum arquivo foi gerado/modificado.' . PHP_EOL);
                break;
            default:
                if ($with_errors) {
                    $this->line('Alguns arquivos foram gerados, porém ocorreu um erro durante.' . PHP_EOL);
                } else {
                    $this->line('Módulo gerado com sucesso.' . PHP_EOL);
                }
                break;
        }

        $this->addServiceProvider();

        $this->bar->finish();
    }

    private function addServiceProvider()
    {
        if (!empty($this->files['ServiceProvider'])) {
            $provider = str_replace('.php', '', $this->files['ServiceProvider']);
            $provider = str_replace([DIRECTORY_SEPARATOR, '/'], '\\', $provider);
            // Register service provider in config/app.php
            $configFile = base_path() . '/config/app.php';
            $file       = file_get_contents($configFile);
            $searchFor  = '/* Module Service Providers */';

            $exists = strpos($file, $provider);
            if (!$exists) {
                $customProviders = strpos($file, $searchFor);

                if ($customProviders) {
                    $newFile = substr_replace($file, $searchFor . "\n" . "\t\t" . "$provider::class,", $customProviders, strlen($searchFor));
                    file_put_contents($configFile, $newFile);
                }
            }
        }
    }

    private function clearCache()
    {
        return Artisan::call('config:clear');
    }
}

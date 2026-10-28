<?php

namespace App\Modules\ModuleGenerator\Templates\ServiceProvider;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ServiceProviderTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'service_provider';
    }

    public function getPath()
    {
        $sep = DIRECTORY_SEPARATOR;
        return parent::getPath() . $sep . 'Providers';
    }

    public function getFileName()
    {
        return "{$this->name}ServiceProvider.php";
    }
}

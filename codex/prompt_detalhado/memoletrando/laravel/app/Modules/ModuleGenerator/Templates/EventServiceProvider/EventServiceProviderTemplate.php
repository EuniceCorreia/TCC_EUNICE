<?php

namespace App\Modules\ModuleGenerator\Templates\EventServiceProvider;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class EventServiceProviderTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'event_service_provider';
    }

    public function getPath()
    {
        $sep = DIRECTORY_SEPARATOR;
        return parent::getPath() . $sep . 'Providers';
    }

    public function getFileName()
    {
        return "{$this->name}EventServiceProvider.php";
    }
}
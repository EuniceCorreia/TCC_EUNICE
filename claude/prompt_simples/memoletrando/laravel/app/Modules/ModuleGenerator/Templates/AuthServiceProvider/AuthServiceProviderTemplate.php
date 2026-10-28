<?php

namespace App\Modules\ModuleGenerator\Templates\AuthServiceProvider;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class AuthServiceProviderTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'auth_service_provider';
    }

    public function getPath()
    {
        $sep = DIRECTORY_SEPARATOR;
        return parent::getPath() . $sep . 'Providers';
    }

    public function getFileName()
    {
        return "{$this->name}AuthServiceProvider.php";
    }
}
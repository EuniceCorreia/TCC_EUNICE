<?php

namespace App\Modules\ModuleGenerator\Templates\ApiRoutes;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ApiRoutesTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'api_routes';
    }

    public function getPath()
    {
        return parent::getPath() . DIRECTORY_SEPARATOR . 'routes';
    }

    public function getFileName()
    {
        return "api.php";
    }
}
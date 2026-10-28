<?php

namespace App\Modules\ModuleGenerator\Templates\WebRoutes;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class WebRoutesTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'web_routes';
    }

    public function getPath()
    {
        return parent::getPath() . DIRECTORY_SEPARATOR . 'routes';
    }

    public function getFileName()
    {
        return "web.php";
    }
}

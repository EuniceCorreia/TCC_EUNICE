<?php

namespace App\Modules\ModuleGenerator\Templates\Service;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ServiceTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'service';
    }

    public function getPath()
    {
        return parent::getPath();
    }

    public function getFileName()
    {
        return "{$this->name}Service.php";
    }
}

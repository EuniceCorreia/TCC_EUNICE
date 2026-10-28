<?php

namespace App\Modules\ModuleGenerator\Templates\Controller;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ControllerTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'controller';
    }

    public function getPath()
    {
        $sep = DIRECTORY_SEPARATOR;
        return parent::getPath() . $sep . 'Http' . $sep . 'Controllers';
    }

    public function getFileName()
    {
        return "{$this->name}Controller.php";
    }
}
<?php

namespace App\Modules\ModuleGenerator\Templates\Model;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ModelTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'model';
    }

    public function getPath()
    {
        return parent::getPath();
    }

    public function getFileName()
    {
        return "{$this->name}.php";
    }
}
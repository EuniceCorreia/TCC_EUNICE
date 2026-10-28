<?php

namespace App\Modules\ModuleGenerator\Templates\Observer;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ObserverTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'observer';
    }

    public function getPath()
    {
        return parent::getPath();
    }

    public function getFileName()
    {
        return "{$this->name}Observer.php";
    }
}
<?php

namespace App\Modules\ModuleGenerator\Templates\Policy;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class PolicyTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'policy';
    }

    public function getPath()
    {
        return parent::getPath();
    }

    public function getFileName()
    {
        return "{$this->name}Policy.php";
    }
}
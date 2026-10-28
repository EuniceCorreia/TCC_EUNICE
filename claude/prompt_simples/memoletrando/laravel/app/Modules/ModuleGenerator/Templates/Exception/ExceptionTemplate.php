<?php

namespace App\Modules\ModuleGenerator\Templates\Exception;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ExceptionTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'exception';
    }

    public function getPath()
    {
        return parent::getPath();
    }

    public function getFileName()
    {
        return "{$this->name}Exception.php";
    }
}

<?php

namespace App\Modules\ModuleGenerator\Templates\Request;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class RequestTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'request';
    }

    public function getPath()
    {
        $sep = DIRECTORY_SEPARATOR;
        return parent::getPath() . $sep . 'Http' . $sep . 'Requests';
    }

    public function getFileName()
    {
        return "{$this->name}Request.php";
    }
}

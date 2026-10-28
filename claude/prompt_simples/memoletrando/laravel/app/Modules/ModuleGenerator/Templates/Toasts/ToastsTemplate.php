<?php

namespace App\Modules\ModuleGenerator\Templates\Toasts;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class ToastsTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'toasts';
    }

    public function getPath()
    {
        return parent::getPath() . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'lang' . DIRECTORY_SEPARATOR . 'pt-br';
    }

    public function getFileName()
    {
        return "toasts.php";
    }
}

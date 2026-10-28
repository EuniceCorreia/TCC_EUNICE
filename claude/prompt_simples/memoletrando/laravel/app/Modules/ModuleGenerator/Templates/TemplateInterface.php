<?php

namespace App\Modules\ModuleGenerator\Templates;

interface TemplateInterface
{
    public function getType();

    public function getPath();

    public function getFileName();
}

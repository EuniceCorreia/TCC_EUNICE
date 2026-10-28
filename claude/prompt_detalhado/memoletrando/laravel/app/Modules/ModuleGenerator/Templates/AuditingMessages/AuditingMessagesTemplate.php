<?php

namespace App\Modules\ModuleGenerator\Templates\AuditingMessages;

use App\Modules\ModuleGenerator\Templates\ModuleTemplate;
use App\Modules\ModuleGenerator\Templates\TemplateInterface;

class AuditingMessagesTemplate extends ModuleTemplate implements TemplateInterface
{
    public function getType()
    {
        return 'auditing_messages';
    }

    public function getPath()
    {
        return parent::getPath() . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'lang' . DIRECTORY_SEPARATOR . 'pt-br';
    }

    public function getFileName()
    {
        return "auditing.php";
    }
}
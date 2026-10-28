<?php

namespace App\Modules\Configs;

use Symfony\Component\HttpKernel\Exception\HttpException;

class ConfigException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

<?php

namespace App\Modules\Levels;

use Symfony\Component\HttpKernel\Exception\HttpException;

class LevelException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

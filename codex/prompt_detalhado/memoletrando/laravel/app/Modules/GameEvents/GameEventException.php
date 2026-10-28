<?php

namespace App\Modules\GameEvents;

use Symfony\Component\HttpKernel\Exception\HttpException;

class GameEventException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

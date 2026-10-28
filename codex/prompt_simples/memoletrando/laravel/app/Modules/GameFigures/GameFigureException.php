<?php

namespace App\Modules\GameFigures;

use Symfony\Component\HttpKernel\Exception\HttpException;

class GameFigureException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

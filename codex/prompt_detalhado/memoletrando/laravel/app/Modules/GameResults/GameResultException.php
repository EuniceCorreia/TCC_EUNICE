<?php

namespace App\Modules\GameResults;

use Symfony\Component\HttpKernel\Exception\HttpException;

class GameResultException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

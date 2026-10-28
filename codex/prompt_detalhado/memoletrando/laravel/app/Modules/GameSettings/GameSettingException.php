<?php

namespace App\Modules\GameSettings;

use Symfony\Component\HttpKernel\Exception\HttpException;

class GameSettingException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

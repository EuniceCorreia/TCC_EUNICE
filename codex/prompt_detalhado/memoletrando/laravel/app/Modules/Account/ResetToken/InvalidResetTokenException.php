<?php

namespace App\Modules\Account\ResetToken;

use Symfony\Component\HttpKernel\Exception\HttpException;

class InvalidResetTokenException extends HttpException
{
    public function __construct()
    {
        parent::__construct(401, 'Token inválido.');
    }
}

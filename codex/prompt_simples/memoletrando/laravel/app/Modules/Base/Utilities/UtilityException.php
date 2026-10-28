<?php

namespace App\Modules\Base\Utilities;

use Symfony\Component\HttpKernel\Exception\HttpException;

class UtilityException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

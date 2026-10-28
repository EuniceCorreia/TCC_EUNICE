<?php

namespace App\Modules\Themes;

use Symfony\Component\HttpKernel\Exception\HttpException;

class ThemeException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

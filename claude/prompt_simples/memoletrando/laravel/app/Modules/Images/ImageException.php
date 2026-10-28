<?php

namespace App\Modules\Images;

use Symfony\Component\HttpKernel\Exception\HttpException;

class ImageException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

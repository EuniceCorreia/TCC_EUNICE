<?php

namespace App\Modules\Categories;

use Symfony\Component\HttpKernel\Exception\HttpException;

class CategoryException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

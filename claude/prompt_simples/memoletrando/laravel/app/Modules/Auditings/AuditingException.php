<?php

namespace App\Modules\Auditings;

use Symfony\Component\HttpKernel\Exception\HttpException;

class AuditingException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}

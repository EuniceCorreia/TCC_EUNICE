<?php

namespace App\Modules\Account;

use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 *
 */
class AccountException extends HttpException
{
   public function __construct(int $statusCode, string $message = null)
   {
      parent::__construct($statusCode, $message);
   }
}

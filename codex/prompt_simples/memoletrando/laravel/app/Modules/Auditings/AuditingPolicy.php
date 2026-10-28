<?php

namespace App\Modules\Auditings;

use Illuminate\Foundation\Auth\User;
use Webfloat\Base\BasePolicy;

class AuditingPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'auditings');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'auditings');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'auditings');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'auditings');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'auditings');
    }
}

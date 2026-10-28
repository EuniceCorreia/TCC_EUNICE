<?php

namespace App\Modules\Auditings;

use App\Modules\Account\Users\User;
use Illuminate\Database\Eloquent\Model;

class Auditing extends Model
{
    protected $fillable = [
        'log_name',
        'description',
        'subject_type',
        'subject_id',
        'causer_type',
        'causer_id',
        'properties',
    ];

    public function causer()
    {
        return $this->belongsTo(User::class, 'causer_id')->withTrashed();
    }

}

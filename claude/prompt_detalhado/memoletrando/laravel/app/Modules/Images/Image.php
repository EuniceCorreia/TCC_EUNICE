<?php

namespace App\Modules\Images;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'path',
        'imageable_id',
        'imageable_type',
        'category',
        'order',
    ];

    public function imageable()
    {
        return $this->morphTo();
    }
}

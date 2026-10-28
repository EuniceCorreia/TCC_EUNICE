<?php

namespace App\Modules\Levels;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = [
        'name',
        'quantity_images',
    ];
}

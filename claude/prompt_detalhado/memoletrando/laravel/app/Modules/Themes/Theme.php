<?php

namespace App\Modules\Themes;

use App\Modules\Categories\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Theme extends Model
{
    use SoftDeletes;
    use LogsActivity;

    protected $fillable = [
        'name',
        'active',
        'order',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function image()
    {
        return $this->morphOne('App\Modules\Images\Image', 'imageable');
    }
}

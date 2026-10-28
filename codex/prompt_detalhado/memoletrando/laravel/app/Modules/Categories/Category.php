<?php

namespace App\Modules\Categories;

use App\Modules\GameFigures\GameFigure;
use App\Modules\Themes\Theme;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Category extends Model
{
    use SoftDeletes;
    use LogsActivity;

    protected $fillable = [
        'name',
        'category_id',
        'active',
        'order',
        'theme_id',
        'main',
    ];

    protected $casts = [
        'active' => 'boolean',
        'main'   => 'boolean',
    ];

    protected $with = [
        'categories',
    ];

    protected $appends = [
        'count_game_figures',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

    public function categories()
    {
        return $this->hasMany($this);
    }

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    public function game_figures()
    {
        return $this->hasMany(GameFigure::class);
    }

    public function getCountGameFiguresAttribute()
    {
        return $this->game_figures()->count();
    }
}

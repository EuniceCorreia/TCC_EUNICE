<?php

namespace App\Modules\GameEvents;

use App\Modules\GameFigures\GameFigure;
use App\Modules\GameSettings\GameSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class GameEvent extends Model
{
    use SoftDeletes;
    use LogsActivity;

    protected $fillable = [
        'type',
        'time',
        'peripheral',
        'value',
        'game_figure_id',
        'game_setting_id',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

    public function game_figure()
    {
        return $this->belongsTo(GameFigure::class);
    }

    public function game_setting()
    {
        return $this->belongsTo(GameSetting::class);
    }
}

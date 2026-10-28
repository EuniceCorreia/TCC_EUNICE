<?php

namespace App\Modules\GameResults;

use App\Modules\GameSettings\GameSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class GameResult extends Model
{
    use SoftDeletes;
    use LogsActivity;

    protected $fillable = [
        'time_to_complete',
        'score',
        'game_setting_id',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

    public function game_setting()
    {
        return $this->belongsTo(GameSetting::class);
    }
}

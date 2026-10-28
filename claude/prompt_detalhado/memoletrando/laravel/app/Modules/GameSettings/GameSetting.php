<?php

namespace App\Modules\GameSettings;

use App\Modules\Account\Users\User;
use App\Modules\Categories\Category;
use App\Modules\Levels\Level;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class GameSetting extends Model
{
    use SoftDeletes;
    use LogsActivity;

    protected $fillable = [
        'quantity_images',
        'category_id',
        'level_id',
        'user_id',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Modules\Account\Users;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;
    use Authorizable;
    use LogsActivity;

    protected $casts = [
        'active' => 'boolean',
    ];

    protected static $logAttributes = [
        'name',
        'username',
        'email',
        'access_level_id',
        'active',
        'authenticable_type',
        'authenticable_id',
        'teacher_id',
    ];

    protected $fillable = [
        'name',
        'username',
        'email',
        'access_level_id',
        'active',
        'password',
        'authenticable_type',
        'authenticable_id',
        'teacher_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'super_admin',
    ];

    protected $appends = [
        'is_player',
        'is_teacher',
        'is_admin',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

    public function access_level()
    {
        return $this->belongsTo('App\Modules\Account\Permissions\AccessLevels\AccessLevel');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class);
    }

    public function players()
    {
        return $this->hasMany(User::class, 'teacher_id');
    }

    public function permissions()
    {
        if (!$this->access_level()->exists()) {
            return [];
        }

        return $this->access_level->permissions()->orderBy('name', 'asc');
    }

    public function getFirstNameAttribute()
    {
        if (empty($this->attributes['name'])) {
            return null;
        }

        return explode(' ', $this->attributes['name'])[0];
    }

    public function authenticable()
    {
        return $this->morphTo();
    }

    public function getIsAdminAttribute()
    {
        return $this->access_level_id == 1;
    }

    public function getIsTeacherAttribute()
    {
        return $this->access_level_id == 2;
    }

    public function getIsPlayerAttribute()
    {
        return $this->access_level_id == 3;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

}

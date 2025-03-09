<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    // Campos que se pueden asignar masivamente con create()
    protected $fillable = ['email', 'username', 'password'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    public function watched(): HasMany
    {
        return $this->hasMany(Watched::class);
    }

    public function watchlist(): HasMany
    {
        return $this->hasMany(Watchlist::class);
    }
}

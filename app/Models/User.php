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
    protected $fillable = ['email', 'nickname', 'password'];

    // Relación con Rating (en este ejemplo 1:1)
    public function rating(): HasMany
    {
        return $this->hasMany(Rating::class);
    }
}

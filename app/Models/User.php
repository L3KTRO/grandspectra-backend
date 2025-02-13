<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    // Campos que se pueden asignar masivamente con create()
    protected $fillable = ['email', 'nickname', 'password'];

    // Relación con Rating (en este ejemplo 1:1)
    public function rating(): HasOne
    {
        return $this->hasOne(Rating::class);
    }
}

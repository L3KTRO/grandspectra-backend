<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    // Campos que se pueden asignar masivamente con create()
    protected $fillable = ['email', 'nickname', 'password'];

    // Relación con Rating (en este ejemplo 1:1)
    public function rating()
    {
        return $this->hasOne(Rating::class);
    }
}

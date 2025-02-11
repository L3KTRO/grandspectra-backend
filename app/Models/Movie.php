<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    // Indica que la clave primaria proviene de TMDB
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'adult', 'original_title', 'popularity', 'video'];
}

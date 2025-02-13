<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TmdbImportable;

class Movie extends Model
{
    use TmdbImportable;

    protected $primaryKey = 'id';
    public $incrementing = false;

    // Define los campos que se pueden asignar en masa
    protected $fillable = ['id', 'original_title', 'popularity'];

    // Define los tipos de dato esperados para cada campo
    protected $casts = [
        'id' => 'integer',
        'original_title' => 'string',
        'popularity' => 'double',
    ];
}

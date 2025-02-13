<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TmdbImportable;

class Person extends Model
{
    use TmdbImportable;

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['id', 'adult', 'name', 'popularity'];

    protected $casts = [
        'id'         => 'integer',
        'adult'       => 'boolean',
        'name'     => 'string', // Ajusta según el tipo (si fuera entero, 'integer')
        'popularity' => 'double',
    ];
}

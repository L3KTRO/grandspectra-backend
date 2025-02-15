<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\TmdbImportable;

class Person extends Model
{
    use TmdbImportable;
    use HasFactory;


    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['id', 'adult', 'name', 'popularity',
        "also_known_as", "biography", "birthday", "deathday",
        "known_for_department", "place_of_birth", "profile_path"
    ];

    protected $casts = [
        'id' => 'integer',
        'adult' => 'boolean',
        'name' => 'string', // Ajusta según el tipo (si fuera entero, 'integer')
        'popularity' => 'double',
        "also_known_as" => 'array',
        "biography" => 'string',
        "birthday" => 'date',
        "deathday" => 'date',
        "known_for_department" => 'string',
        "place_of_birth" => 'string',
        "profile_path" => 'string',
    ];

}

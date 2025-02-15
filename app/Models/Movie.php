<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\TmdbImportable;

class Movie extends Model
{
    use TmdbImportable;
    use HasFactory;


    protected $primaryKey = 'id';
    public $incrementing = false;

    // Define los campos que se pueden asignar en masa
    protected $fillable = ['id', 'original_title', 'popularity',
        'adult', 'video', 'poster_path', 'backdrop_path',
        'original_language', 'overview', 'release_date',
        'revenue', 'runtime', 'status', 'tagline',
        'vote_average', 'vote_count', 'budget', 'homepage',
        'belongs_to_collection', "production_companies",
        "production_countries", "spoken_languages", "genres"
    ];

    // Define los tipos de dato esperados para cada campo
    protected $casts = [
        'id' => 'integer',
        'original_title' => 'string',
        'popularity' => 'double',
        'adult' => 'boolean',
        'video' => 'boolean',
        'poster_path' => 'string',
        'backdrop_path' => 'string',
        'original_language' => 'string',
        'overview' => 'string',
        'release_date' => 'date',
        'revenue' => 'integer',
        'runtime' => 'integer',
        'status' => 'string',
        'tagline' => 'string',
        'vote_average' => 'double',
        'vote_count' => 'integer',
        'budget' => 'integer',
        'homepage' => 'string',
        'belongs_to_collection' => 'string',
        "production_companies" => 'array',
        "production_countries" => 'array',
        "spoken_languages" => 'array',
        "genres" => 'array',
    ];
}

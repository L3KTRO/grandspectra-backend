<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TitleBasic extends Model
{
    protected $table = 'title_basics';
    protected $primaryKey = 'tconst';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'tconst',
        'titleType',
        'primaryTitle',
        'originalTitle',
        'startYear',
        'endYear',
        'runtimeMinutes',
        'genres'
    ];

    public function akas(): HasMany
    {
        return $this->hasMany(TitleAka::class, 'titleId', 'tconst');
    }

    public function crew(): HasOne
    {
        return $this->hasOne(TitleCrew::class, 'tconst', 'tconst');
    }

    public function rating(): HasOne
    {
        return $this->hasOne(TitleRating::class, 'tconst', 'tconst');
    }

    public function principals(): HasMany
    {
        return $this->hasMany(TitlePrincipal::class, 'tconst', 'tconst');
    }
}

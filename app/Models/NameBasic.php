<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NameBasic extends Model
{
    protected $table = 'name_basics';
    protected $primaryKey = 'nconst';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'nconst',
        'primaryName',
        'birthYear',
        'deathYear',
        'primaryProfession',
        'knownForTitles'
    ];

    public function principals(): HasMany
    {
        return $this->hasMany(TitlePrincipal::class, 'nconst', 'nconst');
    }
}

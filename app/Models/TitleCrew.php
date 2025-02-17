<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TitleCrew extends Model
{
    protected $table = 'title_crew';
    protected $primaryKey = 'tconst';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'tconst',
        'directors',
        'writers'
    ];

    public function titleBasic(): BelongsTo
    {
        return $this->belongsTo(TitleBasic::class, 'tconst', 'tconst');
    }
}

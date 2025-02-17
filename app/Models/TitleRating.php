<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TitleRating extends Model
{
    protected $table = 'title_ratings';
    protected $primaryKey = 'tconst';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'tconst',
        'averageRating',
        'numVotes'
    ];

    public function titleBasic(): BelongsTo
    {
        return $this->belongsTo(TitleBasic::class, 'tconst', 'tconst');
    }
}

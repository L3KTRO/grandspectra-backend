<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TitleAka extends Model
{
    protected $table = 'title_akas';
    protected $primaryKey = ['titleId', 'ordering'];
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'titleId',
        'ordering',
        'title',
        'region',
        'language',
        'types',
        'attributes',
        'isOriginalTitle'
    ];

    public function titleBasic(): BelongsTo
    {
        return $this->belongsTo(TitleBasic::class, 'titleId', 'tconst');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TitlePrincipal extends Model
{
    protected $table = 'title_principals';
    protected $primaryKey = ['tconst', 'ordering'];
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'tconst',
        'ordering',
        'nconst',
        'category',
        'job',
        'characters'
    ];

    public function titleBasic(): BelongsTo
    {
        return $this->belongsTo(TitleBasic::class, 'tconst', 'tconst');
    }

    public function nameBasic(): BelongsTo
    {
        return $this->belongsTo(NameBasic::class, 'nconst', 'nconst');
    }
}

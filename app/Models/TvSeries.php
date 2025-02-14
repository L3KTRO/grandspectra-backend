<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\TmdbImportable;

class TvSeries extends Model
{
    use TmdbImportable;
    use HasFactory;


    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['id', 'original_name', 'popularity'];

    protected $casts = [
        'id' => 'integer',
        'original_name' => 'string',
        'popularity' => 'double',
    ];
}

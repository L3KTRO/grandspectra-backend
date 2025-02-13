<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TmdbImportable;

class TvNetwork extends Model
{
    use TmdbImportable;

    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['id', 'name'];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
    ];
}

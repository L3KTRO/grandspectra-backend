<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\TmdbImportable;

class TmdbCollection extends Model
{
    use TmdbImportable;
    use HasFactory;


    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['id', 'name'];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
    ];
}

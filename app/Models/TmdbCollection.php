<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TmdbCollection extends Model
{
    // La tabla es "collections"
    protected $table = 'collections';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'name'];
}

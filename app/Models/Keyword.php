<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'name'];
}

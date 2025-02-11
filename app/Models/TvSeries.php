<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TvSeries extends Model
{
    protected $table = 'tv_series';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'original_name', 'popularity'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TvNetwork extends Model
{
    protected $table = 'tv_networks';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'name'];
}

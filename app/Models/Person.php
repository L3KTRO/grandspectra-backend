<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['id', 'adult', 'name', 'popularity'];
}

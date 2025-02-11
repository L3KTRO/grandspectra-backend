<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    protected $fillable = ['user_id', 'tmdb_id', 'qualification'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

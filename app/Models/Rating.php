<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends MorphContentModel
{
    protected $fillable = ['user_id', 'qualification', 'movie_id', 'tv_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}


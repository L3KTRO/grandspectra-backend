<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends MorphContentModel
{

    protected $fillable = ['user_id', 'movie_id', 'tv_id', 'qualification', 'content'];
    protected $with = ['user'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

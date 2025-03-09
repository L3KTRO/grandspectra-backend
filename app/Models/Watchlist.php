<?php

namespace App\Models;

use App\Models\MorphContentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Watchlist extends MorphContentModel
{
    protected $table = 'watchlist';
    protected $fillable = ['user_id', 'movie_id', 'tv_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

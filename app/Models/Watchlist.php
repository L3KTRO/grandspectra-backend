<?php

namespace App\Models;

use App\Models\MorphContentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Watchlist extends MorphContentModel
{
    protected $table = 'watchlist';
    protected $fillable = ['user_id', 'movie_id', 'tv_id'];
    public $with = ['movie', "tv"];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    public function tv(): BelongsTo
    {
        return $this->belongsTo(Tv::class);
    }
}

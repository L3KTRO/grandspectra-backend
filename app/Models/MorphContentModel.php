<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

abstract class MorphContentModel extends Model
{
    public function content(): BelongsTo
    {
        return $this->movie_id ? $this->belongsTo(Movie::class, 'movie_id') : $this->belongsTo(Tv::class, 'tv_id');
    }

    /**
     * @return BelongsTo<Movie, $this>
     */
    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    /**
     * @return BelongsTo<Tv, $this>
     */
    public function tv(): BelongsTo
    {
        return $this->belongsTo(Tv::class);
    }

}

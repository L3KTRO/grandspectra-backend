<?php

namespace App\Models;

use App\Models\MorphContentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Watched extends MorphContentModel
{
    protected $table = 'watched';
    protected $fillable = ['user_id', 'movie_id', 'tv_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

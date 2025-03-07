<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    protected $fillable = ['user_id', 'type', 'tmdb_id', 'qualification'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Método para obtener el contenido relacionado
    public function getMedia()
    {
        if ($this->type === 'movie') {
            return Movie::find($this->tmdb_id);
        } else {
            return Tv::find($this->tmdb_id);
        }
    }
}


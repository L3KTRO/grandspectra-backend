<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContentList extends Model
{
    protected $fillable = ['name', 'description', 'user_id', "public"];

    protected $with = ['movie', 'tv'];

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function movie(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class);
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function tv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class);
    }

    public function votes(): HasMany
    {
        $model = new class extends Model {
            protected $table = 'content_list_votes';
            protected $fillable = [
                "vote",
            ];
        };

        return $this->hasMany(
            $model::class,
        );
    }
}

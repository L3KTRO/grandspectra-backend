<?php

declare(strict_types=1);

/**
 * NOTICE OF LICENSE.
 *
 * UNIT3D Community Edition is open-sourced software licensed under the GNU Affero General Public License v3.0
 * The details is bundled with this project in the file LICENSE.txt.
 *
 * @project    UNIT3D Community Edition
 *
 * @author     HDVinnie <hdinnovations@protonmail.com>
 * @license    https://www.gnu.org/licenses/agpl-3.0.en.html/ GNU Affero General Public License v3.0
 */

namespace App\Models;

use Database\Factories\PersonFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\Occupation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

/**
 * App\Models\Person.
 *
 * @property int $id
 * @property string $name
 * @property string|null $imdb_id
 * @property string|null $known_for_department
 * @property string|null $place_of_birth
 * @property string|null $popularity
 * @property string|null $profile
 * @property string|null $still
 * @property string|null $adult
 * @property string|null $also_known_as
 * @property string|null $biography
 * @property string|null $birthday
 * @property string|null $deathday
 * @property string|null $gender
 * @property string|null $homepage
 */
class Person extends Model
{
    /** @use HasFactory<PersonFactory> */
    use HasFactory, Searchable;

    protected $guarded = [];
    public $with = [];

    public $timestamps = false;

    /**
     * @return HasMany<Credit, $this>
     */
    public function credits(): HasMany
    {
        return $this->hasMany(Credit::class);
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function tv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function createdTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::CREATOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function directedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::DIRECTOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function writtenTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::WRITER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function producedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::PRODUCER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function composedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::COMPOSER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function cinematographedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::CINEMATOGRAPHER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function editedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::EDITOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function productionDesignedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::PRODUCTION_DESIGNER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function artDirectedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::ART_DIRECTOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function actedTv(): BelongsToMany
    {
        return $this->belongsToMany(Tv::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::ACTOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function movie(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function directedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::DIRECTOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function writtenMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::WRITER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function producedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::PRODUCER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function composedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::COMPOSER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function cinematographedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::CINEMATOGRAPHER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function editedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::EDITOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function productionDesignedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::PRODUCTION_DESIGNER)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function artDirectedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::ART_DIRECTOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function actedMovies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::ACTOR)
            ->withPivot('character', 'occupation_id')
            ->as('credit');
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'imdb_id' => $this->imdb_id,
            'name' => $this->name,
            'popularity' => (float)$this->popularity,
            'known_for_department' => $this->known_for_department,
            'place_of_birth' => $this->place_of_birth,
            'profile' => (int)$this->profile,
            'also_known_as' => (float)$this->also_known_as,
            'biography' => (int)$this->biography,
            'still' => $this->still, // Aquí están los géneros
            "birthday" => $this->birthday,
            "deathday" => $this->deathday,
            'adult' => $this->adult,
            "gender" => $this->gender,
            "homepage" => $this->homepage
        ];
    }

    public function makeSearchableUsing(Collection $models): Collection
    {
        return $models->load('genres'); // Eager loading para optimizar
    }
}

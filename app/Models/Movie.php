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

use Database\Factories\MovieFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\Occupation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\Movie.
 *
 * @property int $id
 * @property string|null $tmdb_id
 * @property string|null $imdb_id
 * @property string $title
 * @property string $title_sort
 * @property string|null $original_language
 * @property int|null $adult
 * @property string|null $backdrop
 * @property string|null $budget
 * @property string|null $homepage
 * @property string|null $original_title
 * @property string|null $overview
 * @property string|null $popularity
 * @property string|null $poster
 * @property Carbon|null $release_date
 * @property string|null $revenue
 * @property string|null $runtime
 * @property string|null $status
 * @property string|null $tagline
 * @property string|null $vote_average
 * @property int|null $vote_count
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $trailer
 */
class Movie extends Model
{
    /** @use HasFactory<MovieFactory> */
    use HasFactory;

    protected $guarded = [];
    public $with = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array{release_date: 'datetime'}
     */
    protected function casts(): array
    {
        return [
            'release_date' => 'datetime',
        ];
    }

    /**
     * @return BelongsToMany<Genre, $this>
     */
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    /**
     * @return BelongsToMany<Person, $this>
     */
    public function people(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'credits');
    }

    /**
     * @return HasMany<Credit, $this>
     */
    public function credits(): HasMany
    {
        return $this->hasMany(Credit::class);
    }

    /**
     * @return BelongsToMany<Person, $this>
     */
    public function directors(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::DIRECTOR->value);
    }

    /**
     * @return BelongsToMany<Company, $this>
     */
    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class);
    }

    /**
     * @return BelongsToMany<Collection, $this>
     */
    public function collection(): BelongsToMany
    {
        return $this->belongsToMany(Collection::class)->take(1);
    }

    /**
     * @return HasMany<Recommendation, $this>
     */
    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class, 'movie_id', 'id');
    }

    /**
     * @return BelongsToMany<Movie, $this>
     */
    public function recommendedMovies(): BelongsToMany
    {
        return $this->belongsToMany(__CLASS__, Recommendation::class, 'movie_id', 'recommendation_movie_id', 'id', 'id');
    }

    /**
     * @return HasMany
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'movie_id', 'id');
    }

}

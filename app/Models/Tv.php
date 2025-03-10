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

use Database\Factories\TvFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\Occupation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\Tv.
 *
 * @property int $id
 * @property string|null $tmdb_id
 * @property string|null $imdb_id
 * @property string|null $tvdb_id
 * @property string|null $type
 * @property string $name
 * @property string $name_sort
 * @property string|null $overview
 * @property int|null $number_of_episodes
 * @property int|null $count_existing_episodes
 * @property int|null $count_total_episodes
 * @property int|null $number_of_seasons
 * @property string|null $episode_run_time
 * @property Carbon|null $first_air_date
 * @property string|null $status
 * @property string|null $homepage
 * @property int|null $in_production
 * @property Carbon|null $last_air_date
 * @property string|null $next_episode_to_air
 * @property string|null $origin_country
 * @property string|null $original_language
 * @property string|null $original_name
 * @property string|null $popularity
 * @property string|null $backdrop
 * @property string|null $poster
 * @property string|null $vote_average
 * @property int|null $vote_count
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $trailer
 */
class Tv extends Model
{
    /** @use HasFactory<TvFactory> */
    use HasFactory;

    protected $guarded = [];

    public $table = 'tv';

    protected $hidden = ['created_at', 'updated_at'];
    public $with = ['credits.person', "credits.occupation", "genres", "companies", "seasons"];

    /**
     * Get the attributes that should be cast.
     *
     * @return array{first_air_date: 'datetime', last_air_date: 'datetime'}
     */
    protected function casts(): array
    {
        return [
            'first_air_date' => 'datetime',
            'last_air_date' => 'datetime',
        ];
    }

    /**
     * @return HasMany<Season, $this>
     */
    public function seasons(): HasMany
    {
        return $this->hasMany(Season::class)
            ->oldest('season_number');
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
    public function creators(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'credits')
            ->wherePivot('occupation_id', '=', Occupation::CREATOR->value);
    }

    /**
     * @return BelongsToMany<Genre, $this>
     */
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    /**
     * @return BelongsToMany<Network, $this>
     */
    public function networks(): BelongsToMany
    {
        return $this->belongsToMany(Network::class);
    }

    /**
     * @return BelongsToMany<Company, $this>
     */
    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class);
    }

    /**
     * @return HasMany<Recommendation, $this>
     */
    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class, 'tv_id', 'id');
    }

    /**
     * @return BelongsToMany<Tv, $this>
     */
    public function recommendedTv(): BelongsToMany
    {
        return $this->belongsToMany(__CLASS__, Recommendation::class, 'tv_id', 'recommendation_tv_id', 'id', 'id');
    }
}

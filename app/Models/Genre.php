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

use Database\Factories\GenreFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Genre.
 *
 * @property int $id
 * @property string $name
 */
class Genre extends Model
{
    /** @use HasFactory<GenreFactory> */
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

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
}

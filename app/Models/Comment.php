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

use App\Traits\Auditable;
use Database\Factories\CommentFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;

/**
 * App\Models\Comment.
 *
 * @property int $id
 * @property string $content
 * @property int $anon
 * @property int|null $user_id
 * @property int|null $parent_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $commentable_type
 * @property int $commentable_id
 */
class Comment extends Model
{
    use Auditable;

    /** @use HasFactory<CommentFactory> */
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var string[]
     */
    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array{anon: 'bool'}
     */
    protected function casts(): array
    {
        return [
            'anon' => 'bool',
        ];
    }

    /**
     * Belongs To A User.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault([
            'username' => 'System',
            'id' => User::SYSTEM_USER_ID,
        ]);
    }

    /**
     * @return MorphTo<Model, $this>
     */
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return HasMany<self, $this>
     */
    public function children(): HasMany
    {
        return $this->hasMany(__CLASS__, 'parent_id')->oldest();
    }

    public function isParent(): bool
    {
        return null === $this->parent_id;
    }

    public function isChild(): bool
    {
        return null !== $this->parent_id;
    }

    /**
     * @param Builder<Comment> $builder
     */
    public function scopeParent(Builder $builder): void
    {
        $builder->whereNull('parent_id');
    }
}

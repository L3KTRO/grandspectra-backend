<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable, SoftDeletes;

    public $with = [];

    // Campos que se pueden asignar masivamente con create()
    protected $fillable = ['name', 'email', 'username', 'password', 'avatar', 'is_admin'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    public function watched(): HasMany
    {
        return $this->hasMany(Watched::class);
    }

    public function watchlist(): HasMany
    {
        return $this->hasMany(Watchlist::class);
    }


    public function following(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id')->withTimestamps();
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id')->withTimestamps();
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function personFollow(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'people_followers', 'user_id', 'person_id')->withTimestamps();
    }

    public function contentListsSaved(): BelongsToMany
    {
        return $this->belongsToMany(ContentList::class, 'content_list_user', 'user_id', 'content_list_id')->withTimestamps();
    }

    public function contentListsVote(): BelongsToMany
    {
        return $this->belongsToMany(ContentList::class, 'content_list_votes', 'user_id', 'content_list_id')->withTimestamps();
    }

    public function contentLists(): HasMany
    {
        return $this->hasMany(ContentList::class);
    }


}

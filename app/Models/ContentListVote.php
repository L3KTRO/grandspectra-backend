<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentListVote extends Model
{
    protected $table = 'content_list_votes';
    protected $fillable = [
        "vote", "user_id"
    ];

    public function contentList(): BelongsTo
    {
        return $this->belongsTo(ContentList::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

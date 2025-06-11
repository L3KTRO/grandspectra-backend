<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserWasFollowed
{
    use Dispatchable, SerializesModels;

    /**
     * @param User $follower El usuario que realizó la acción de seguir.
     * @param User $followed El usuario que fue seguido.
     */
    public function __construct(
        public User $follower,
        public User $followed
    )
    {
    }
}

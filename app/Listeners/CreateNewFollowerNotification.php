<?php

namespace App\Listeners;

use App\Events\UserWasFollowed;
use App\Notifications\NewFollowerNotification;
use Illuminate\Support\Facades\Log;

class CreateNewFollowerNotification
{
    /**
     * Maneja el evento.
     */
    public function handle(UserWasFollowed $event): void
    {
        $event->followed->notify(new NewFollowerNotification($event->follower, $event->followed));
    }
}

<?php

namespace App\Listeners;

use App\Events\UserWasUnfollowed;
use App\Notifications\NewFollowerNotification;

class DeleteFollowerNotification
{
    /**
     * Maneja el evento.
     */
    public function handle(UserWasUnfollowed $event): void
    {
        // Busca la notificación específica y la elimina.
        $event->followed->notifications()
            ->where('type', NewFollowerNotification::class)
            ->where('data->follower_id', $event->follower->id)
            ->delete();
    }
}

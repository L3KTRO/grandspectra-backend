<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class ContentListDeleted extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Crea una nueva instancia de la notificación.
     * @param string $listName El título de la lista que fue eliminada.
     */
    public function __construct(public string $listName)
    {
        $this->onConnection('redis');
        $this->onQueue('notifications');
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'content_list_deleted',
            'message' => "The list '{$this->listName}' you had saved has been deleted.",
        ];
    }
}

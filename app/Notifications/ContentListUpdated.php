<?php

namespace App\Notifications;

use App\Models\ContentList;

// Asumiendo que tu modelo se llama así
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class ContentListUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Crea una nueva instancia de la notificación.
     */
    public function __construct(public ContentList $list)
    {
        $this->onConnection('redis');
        $this->onQueue('notifications');
        Log::info("Notificación de actualización de lista de contenido creada para: ");
        Log::info($this->list);
    }

    /**
     * Define los canales de la notificación.
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Obtiene la representación para la base de datos.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            "type" => 'content_list_updated',
            'list_id' => $this->list->id,
            'list_name' => $this->list->name,
            'message' => "The list '{$this->list->name}' you have saved has been updated.",
        ];
    }
}

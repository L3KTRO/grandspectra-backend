<?php

namespace App\Observers;

use App\Models\ContentList;
use App\Models\User;
use App\Notifications\ContentListDeleted;
use App\Notifications\ContentListUpdated;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class ContentListObserver
{
    /**
     * Maneja el evento "updated" del modelo ContentList.
     */
    public function updated(ContentList $list): void
    {
        Log::info("Actualizando lista de contenido: " . $list->name);
        // --- LÓGICA ANTI-SPAM ---
        // Si la lista ha sido actualizada en los últimos 5 minutos, no hacemos nada.
        // Usamos getOriginal() para obtener el valor de 'updated_at' ANTES de esta actualización.
        if ($list->getOriginal('updated_at')->diffInMinutes(now()) < 5) {
            //return;
        }


        // --- NOTIFICACIÓN ---
        // Obtenemos todos los usuarios que tienen esta lista guardada.
        $recipients = $list->savedByUsers()->get();

        // Si no hay nadie para notificar, terminamos.
        if ($recipients->isEmpty()) {
            return;
        }

        Log::info($list);

        // Enviamos la notificación a todos los destinatarios.
        Notification::send($recipients, new ContentListUpdated($list));
    }

    /**
     * Maneja el evento "deleted" del modelo ContentList.
     */
    public function deleting(ContentList $list): void
    {
        // Obtenemos los destinatarios de la misma forma.
        $recipients = $list->savedByUsers()->get();

        if ($recipients->isEmpty()) {
            return;
        }

        // Enviamos la notificación, pasando solo el título.
        Notification::send($recipients, new ContentListDeleted($list->name));
    }
}

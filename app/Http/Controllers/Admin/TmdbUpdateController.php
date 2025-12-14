<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\TmdbDailyUpdateJob;
use Illuminate\Http\JsonResponse;

class TmdbUpdateController extends Controller
{
    /**
     * Ejecuta la actualización diaria de TMDB en segundo plano
     */
    public function update(): JsonResponse
    {
        TmdbDailyUpdateJob::dispatch();

        return response()->json([
            'message' => 'Actualización de contenido iniciada en segundo plano.',
        ]);
    }
}

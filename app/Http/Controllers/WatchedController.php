<?php

namespace App\Http\Controllers;

use App\Models\Watched;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WatchedController extends Controller
{
    // Obtener contenido visto por un usuario
    public function index(User $user): JsonResponse
    {
        return $user->watched()
            ->with(['movie', 'tv'])
            ->get()
            ->map(function ($watched) {
                return $this->formatWatched($watched);
            });
    }

    // Marcar contenido como visto
    public function store(Request $request): JsonResponse
    {
        $user_id = $request->user()->id;

        $validated = $request->validate([
            'movie_id' => 'nullable|required_without:tv_id|exists:movies,id',
            'tv_id' => 'nullable|required_without:movie_id|exists:tv,id'
        ]);

        $watched = Watched::firstOrCreate(array_merge($validated, ['user_id' => $user_id]));
        return response()->json($this->formatWatched($watched), 201);
    }

    // Eliminar de la lista de vistos
    public function destroy(Watched $watched): JsonResponse
    {
        $watched->delete();
        return response()->json(['message' => 'Contenido eliminado de vistos'], 204);
    }

    private function formatWatched(Watched $watched)
    {
        return [
            'id' => $watched->id,
            'content' => $watched->movie ?? $watched->tv,
            'watched_at' => $watched->created_at
        ];
    }
}

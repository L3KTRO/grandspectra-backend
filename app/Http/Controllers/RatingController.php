<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\User;
use App\Models\Movie;
use App\Models\Tv;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RatingController extends Controller
{
    // Crear nueva calificación
    public function store(Request $request): JsonResponse|array
    {
        $user_id = $request->user()->id;

        $validated = $request->validate([
            'movie_id' => 'nullable|required_without:tv_id|exists:movies,id',
            'tv_id' => 'nullable|required_without:movie_id|exists:tv,id',
            'qualification' => 'required|integer|min:1|max:10'
        ]);

        // Verificar que no exista duplicado
        $existing = Rating::where('user_id', $user_id)
            ->where(function ($query) use ($validated) {
                if ($validated['movie_id'] ?? null) {
                    return $query->where('movie_id', $validated['movie_id']);
                } elseif ($validated['tv_id']) {
                    return $query->where('tv_id', $validated['tv_id']);
                }
                return response()->json(['error' => 'Debe proporcionar un movie_id o tv_id'], 400);
            });

        if ($existing->exists()) {
            return response()->json(['error' => 'Ya existe una calificación para este contenido'], 409);
        }

        $args = array_merge($validated, ['user_id' => $user_id]);

        return response()->json($this->formatRating(Rating::create($args)), 201);
    }

    // Actualizar calificación existente
    public function update(Request $request, Rating $rating): JsonResponse
    {
        $user_id = $request->user()->id;

        if ($rating->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'qualification' => 'required|integer|min:1|max:10'
        ]);

        $rating->update($validated);
        return response()->json($this->formatRating($rating));
    }

    // Eliminar calificación
    public function destroy(Request $request, Rating $rating): JsonResponse
    {
        $user_id = $request->user()->id;

        if ($rating->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $rating->delete();
        return response()->json(['message' => 'Calificación eliminada'], 204);
    }

    private function formatRating(Rating $rating): array
    {
        return [
            'id' => $rating->id,
            'qualification' => $rating->qualification,
            "content_id" => $rating->movie_id ?? $rating->tv_id,
            'content_type' => $rating->movie_id ? 'movie' : 'tv',
            'created_at' => $rating->created_at
        ];
    }
}

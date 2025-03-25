<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\User;
use App\Models\Movie;
use App\Models\Tv;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RatingController extends Controller
{
    public array $relations = ['movie', "tv"];

    // Obtener todas las calificaciones de un usuario
    public function userRatings(User $user)
    {
        return $user->ratings()
            ->with(['movie', 'tv'])
            ->get()
            ->map(function ($rating) {
                return $this->formatRating($rating);
            });
    }

    // Obtener calificaciones para un contenido específico (movie/tv)
    public function contentRatings(Request $request, $type, $id)
    {
        $model = $type === 'movie' ? Movie::class : Tv::class;
        $content = $model::findOrFail($id);

        return $content->ratings()
            ->with('user')
            ->paginate(10)
            ->through(function ($rating) {
                return $this->formatRating($rating);
            });
    }

    // Crear nueva calificación
    public function store(Request $request)
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

        $rating = Rating::create($args);
        return $this->formatRating($rating);
    }

    // Actualizar calificación existente
    public function update(Request $request, Rating $rating)
    {
        $user_id = $request->user()->id;

        if ($rating->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'qualification' => 'required|integer|min:1|max:10'
        ]);

        $rating->update($validated);
        return $this->formatRating($rating->fresh(['movie', 'tv']));
    }

    // Eliminar calificación
    public function destroy(Request $request, Rating $rating)
    {
        $user_id = $request->user()->id;

        if ($rating->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $rating->delete();
        return response()->json(['message' => 'Calificación eliminada'], 204);
    }

    private function formatRating(Rating $rating)
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

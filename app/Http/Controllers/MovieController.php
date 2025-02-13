<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MovieController extends Controller
{
    // Devuelve todos los registros
    public function index(): JsonResponse
    {
        $movies = Movie::paginate(500);
        return response()->json($movies);
    }

    public function indexByPopularity(): JsonResponse
    {
        $movies = Movie::orderBy('popularity', 'desc')->paginate(100);
        return response()->json($movies);
    }


    // Devuelve un registro en particular
    public function show($id): JsonResponse
    {
        return response()->json(Movie::findOrFail($id));
    }

    // Permite crear un nuevo registro
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|numeric',
            'original_title' => 'required|string',
            'popularity' => 'required|numeric',
        ]);

        $data['original_title'] = Str::limit($data['original_title'], 255);

        $movie = Movie::create($data);

        return response()->json($movie, 201);
    }

    // Actualiza un registro existente
    public function update(Request $request, $id): JsonResponse
    {
        $movie = Movie::findOrFail($id);
        $data = $request->validate([
            'original_title' => 'sometimes|string|max:255',
            'popularity' => 'sometimes|numeric',
        ]);

        $data['original_title'] = Str::limit($data['original_title'], 255);

        $movie->update($data);

        return response()->json($movie);
    }

    // Elimina un registro
    public function destroy($id): JsonResponse
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();

        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Http\Requests\MovieRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class MovieController extends Controller
{
    public function index(): JsonResponse
    {
        $movies = Movie::paginate(100);
        return response()->json($movies);
    }

    public function indexByPopularity(): JsonResponse
    {
        $movies = Movie::orderBy('popularity', 'desc')->paginate(100);
        return response()->json($movies);
    }

    public function show($id): JsonResponse
    {
        return response()->json(Movie::findOrFail($id));
    }

    public function store(MovieRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['original_title'] = Str::limit($data['original_title'], 255);
        $movie = Movie::create($data);
        return response()->json($movie, 201);
    }

    public function update(MovieRequest $request, $id): JsonResponse
    {
        $movie = Movie::findOrFail($id);
        $data = $request->validated();
        if (isset($data['original_title'])) {
            $data['original_title'] = Str::limit($data['original_title'], 255);
        }
        $movie->update($data);
        return response()->json($movie);
    }

    public function destroy($id): JsonResponse
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();
        return response()->json(null, 204);
    }
}

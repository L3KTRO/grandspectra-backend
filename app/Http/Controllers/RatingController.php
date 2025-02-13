<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Http\Requests\RatingRequest;
use Illuminate\Http\JsonResponse;

class RatingController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Rating::all());
    }

    public function store(RatingRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $rating = Rating::create($validated);
        return response()->json($rating, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Rating::findOrFail($id));
    }

    public function update(RatingRequest $request, string $id): JsonResponse
    {
        $rating = Rating::findOrFail($id);
        $rating->update($request->validated());
        return response()->json($rating);
    }

    public function destroy(string $id): JsonResponse
    {
        Rating::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

}

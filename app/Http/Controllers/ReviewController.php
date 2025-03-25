<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    function store(Request $request): JsonResponse
    {
        $user_id = $request->user()->id;

        $validated = $request->validate([
            'movie_id' => 'nullable|required_without:tv_id|exists:movies,id',
            'tv_id' => 'nullable|required_without:movie_id|exists:tv,id',
            'content' => 'required|string|max:5000',
            'qualification' => 'required|integer|min:1|max:10'
        ]);

        return response()->json(Review::create(array_merge($validated, ['user_id' => $user_id])), 201);
    }

    function update(Request $request, Review $review): JsonResponse
    {
        $user_id = $request->user()->id;

        if ($review->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'content' => 'required|string|max:5000',
            'qualification' => 'required|integer|min:1|max:10'
        ]);

        $review->update($validated);

        return response()->json($review);
    }

    function destroy(Request $request, Review $review): JsonResponse
    {
        $user_id = $request->user()->id;

        if ($review->user_id !== $user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $review->delete();

        return response()->json(null, 204);
    }
}

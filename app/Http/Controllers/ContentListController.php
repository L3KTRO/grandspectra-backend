<?php

namespace App\Http\Controllers;

use App\Models\ContentList;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentListController extends Controller
{
    function index(): JsonResponse
    {
        $contentLists = ContentList::get();

        return response()->json($contentLists);
    }

    function show($contentListId): JsonResponse
    {
        $contentList = ContentList::where('id', $contentListId)->first();

        if (!$contentList) {
            return response()->json(['error' => 'Content list not found'], 404);
        }

        return response()->json($contentList);
    }

    function store(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string|max:1000",
            'movie_id' => 'nullable|array|exists:movies,id',
            'tv_id' => 'nullable|array|exists:tv,id',
            "public" => "boolean|default:true",
        ]);

        $content = ContentList::create(array_merge($validated, ['user_id' => $user->id]));

        if (isset($validated['tv_id'])) {
            $content->tv()->attach($validated['tv_id']);
        }

        if (isset($validated['movie_id'])) {
            $content->movie()->attach($validated['movie_id']);
        }

        return response()->json($content, 201);
    }

    function update(Request $request, $contentListId): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            "name" => "required|string|max:255",
            "description" => "nullable|string|max:1000",
            'movie_id' => 'nullable|array|exists:movies,id',
            'tv_id' => 'nullable|array|exists:tv,id',
            "public" => "nullable|boolean",
        ]);

        var_dump($validated);

        $content = ContentList::find($contentListId);

        if (!$content) {
            return response()->json(['error' => 'Content list not found'], 404);
        }

        $content->update($validated);

        if (isset($validated['tv_id'])) {
            $content->tv()->sync($validated['tv_id']);
        }

        if (isset($validated['movie_id'])) {
            $content->movie()->sync($validated['movie_id']);
        }

        return response()->json($content);
    }

    function destroy(Request $request, $contentListId): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $content = ContentList::find($contentListId);

        if (!$content) {
            return response()->json(['error' => 'Content list not found'], 404);
        }

        if ($content->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $content->delete();

        return response()->json(['message' => 'Content list deleted successfully'], 204);
    }

    function vote($contentListId): JsonResponse // PUT
    {
        $user = request()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = request()->validate([
            "vote" => "required|boolean",
        ]);

        $contentList = ContentList::find($contentListId);

        if (!$contentList) {
            return response()->json(['error' => 'Content list not found'], 404);
        }

        $contentList->votes()->sync([$user->id => ['vote' => $validated['vote']]]);

        return response()->json(['message' => 'Vote recorded successfully: ' . ($validated['vote'] ? 'upvote' : 'downvote')]);
    }

    function unvote($contentListId): JsonResponse // DELETE
    {
        $user = request()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $contentList = ContentList::find($contentListId);

        if (!$contentList) {
            return response()->json(['error' => 'Content list not found'], 404);
        }

        $contentList->votes()->detach($user->id);

        return response()->json(['message' => 'Vote removed successfully']);
    }
}

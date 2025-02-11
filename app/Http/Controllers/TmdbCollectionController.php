<?php

namespace App\Http\Controllers;

use App\Models\TmdbCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TmdbCollectionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(TmdbCollection::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required|string',
        ]);

        $collection = TmdbCollection::create($data);
        return response()->json($collection, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(TmdbCollection::findOrFail($id));
    }

    public function update(Request $request, $id): JsonResponse
    {
        $collection = TmdbCollection::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
        ]);

        $collection->update($data);
        return response()->json($collection);
    }

    public function destroy($id): JsonResponse
    {
        TmdbCollection::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

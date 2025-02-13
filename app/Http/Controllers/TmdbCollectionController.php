<?php

namespace App\Http\Controllers;

use App\Models\TmdbCollection;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TmdbCollectionRequest;

class TmdbCollectionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(TmdbCollection::all());
    }

    public function store(TmdbCollectionRequest $request): JsonResponse
    {
        $data = $request->validated();
        $collection = TmdbCollection::create($data);
        return response()->json($collection, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(TmdbCollection::findOrFail($id));
    }

    public function update(TmdbCollectionRequest $request, $id): JsonResponse
    {
        $collection = TmdbCollection::findOrFail($id);
        $data = $request->validated();
        $collection->update($data);
        return response()->json($collection);
    }

    public function destroy($id): JsonResponse
    {
        TmdbCollection::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

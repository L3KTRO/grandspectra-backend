<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TmdbCollectionRequest;

class TmdbCollectionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Collection::all());
    }

    public function store(TmdbCollectionRequest $request): JsonResponse
    {
        $data = $request->validated();
        $collection = Collection::create($data);
        return response()->json($collection, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(Collection::findOrFail($id));
    }

    public function update(TmdbCollectionRequest $request, $id): JsonResponse
    {
        $collection = Collection::findOrFail($id);
        $data = $request->validated();
        $collection->update($data);
        return response()->json($collection);
    }

    public function destroy($id): JsonResponse
    {
        Collection::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

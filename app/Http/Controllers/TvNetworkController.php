<?php

namespace App\Http\Controllers;

use App\Models\TvNetwork;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TvNetworkRequest;

class TvNetworkController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(TvNetwork::all());
    }

    public function store(TvNetworkRequest $request): JsonResponse
    {
        $data = $request->validated();
        $network = TvNetwork::create($data);
        return response()->json($network, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(TvNetwork::findOrFail($id));
    }

    public function update(TvNetworkRequest $request, $id): JsonResponse
    {
        $network = TvNetwork::findOrFail($id);
        $data = $request->validated();
        $network->update($data);
        return response()->json($network);
    }

    public function destroy($id): JsonResponse
    {
        TvNetwork::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

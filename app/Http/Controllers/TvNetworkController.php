<?php

namespace App\Http\Controllers;

use App\Models\TvNetwork;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TvNetworkController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(TvNetwork::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required|string',
        ]);

        $network = TvNetwork::create($data);
        return response()->json($network, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(TvNetwork::findOrFail($id));
    }

    public function update(Request $request, $id): JsonResponse
    {
        $network = TvNetwork::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
        ]);

        $network->update($data);
        return response()->json($network);
    }

    public function destroy($id): JsonResponse
    {
        TvNetwork::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

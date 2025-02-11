<?php

namespace App\Http\Controllers;

use App\Models\TvSeries;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TvSeriesController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(TvSeries::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|numeric',
            'original_name' => 'required|string',
            'popularity' => 'required|numeric',
        ]);

        $tvSeries = TvSeries::create($data);
        return response()->json($tvSeries, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(TvSeries::findOrFail($id));
    }

    public function update(Request $request, $id): JsonResponse
    {
        $tvSeries = TvSeries::findOrFail($id);
        $data = $request->validate([
            'original_name' => 'sometimes|string',
            'popularity' => 'sometimes|numeric',
        ]);

        $tvSeries->update($data);
        return response()->json($tvSeries);
    }

    public function destroy($id): JsonResponse
    {
        TvSeries::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

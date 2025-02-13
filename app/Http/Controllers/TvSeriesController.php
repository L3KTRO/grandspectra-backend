<?php

namespace App\Http\Controllers;

use App\Models\TvSeries;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TvSeriesRequest;

class TvSeriesController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(TvSeries::all());
    }

    public function store(TvSeriesRequest $request): JsonResponse
    {
        $data = $request->validated();
        $tvSeries = TvSeries::create($data);
        return response()->json($tvSeries, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(TvSeries::findOrFail($id));
    }

    public function update(TvSeriesRequest $request, $id): JsonResponse
    {
        $tvSeries = TvSeries::findOrFail($id);
        $data = $request->validated();
        $tvSeries->update($data);
        return response()->json($tvSeries);
    }

    public function destroy($id): JsonResponse
    {
        TvSeries::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

}

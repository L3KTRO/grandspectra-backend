<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KeywordController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Keyword::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required|string',
        ]);

        $keyword = Keyword::create($data);
        return response()->json($keyword, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(Keyword::findOrFail($id));
    }

    public function update(Request $request, $id): JsonResponse
    {
        $keyword = Keyword::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
        ]);

        $keyword->update($data);
        return response()->json($keyword);
    }

    public function destroy($id): JsonResponse
    {
        Keyword::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

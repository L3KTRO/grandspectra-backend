<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\KeywordRequest;

class KeywordController extends Controller
{
    // Lista todos los keywords
    public function index(): JsonResponse
    {
        return response()->json(Keyword::all());
    }

    // Crear un nuevo keyword
    public function store(KeywordRequest $request): JsonResponse
    {
        $data = $request->validated();
        $keyword = Keyword::create($data);
        return response()->json($keyword, 201);
    }

    // Mostrar un keyword en particular
    public function show($id): JsonResponse
    {
        return response()->json(Keyword::findOrFail($id));
    }

    // Actualizar un keyword existente
    public function update(KeywordRequest $request, $id): JsonResponse
    {
        $keyword = Keyword::findOrFail($id);
        $data = $request->validated();
        $keyword->update($data);
        return response()->json($keyword);
    }

    // Eliminar un keyword
    public function destroy($id): JsonResponse
    {
        Keyword::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

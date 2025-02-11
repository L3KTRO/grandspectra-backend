<?php

namespace App\Http\Controllers;

use App\Models\ProductionCompany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductionCompanyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(ProductionCompany::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|numeric',
            'name' => 'required|string',
        ]);

        $company = ProductionCompany::create($data);
        return response()->json($company, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(ProductionCompany::findOrFail($id));
    }

    public function update(Request $request, $id): JsonResponse
    {
        $company = ProductionCompany::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
        ]);

        $company->update($data);
        return response()->json($company);
    }

    public function destroy($id): JsonResponse
    {
        ProductionCompany::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

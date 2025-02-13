<?php

namespace App\Http\Controllers;

use App\Models\ProductionCompany;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\ProductionCompanyRequest;

class ProductionCompanyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(ProductionCompany::all());
    }

    public function store(ProductionCompanyRequest $request): JsonResponse
    {
        $data = $request->validated();
        $company = ProductionCompany::create($data);
        return response()->json($company, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(ProductionCompany::findOrFail($id));
    }

    public function update(ProductionCompanyRequest $request, $id): JsonResponse
    {
        $company = ProductionCompany::findOrFail($id);
        $data = $request->validated();
        $company->update($data);
        return response()->json($company);
    }

    public function destroy($id): JsonResponse
    {
        ProductionCompany::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

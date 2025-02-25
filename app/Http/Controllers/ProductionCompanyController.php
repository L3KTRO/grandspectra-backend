<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductionCompanyRequest;
use App\Models\Company;
use Illuminate\Http\JsonResponse;

class ProductionCompanyController extends TmdbController
{
    public function index(): JsonResponse
    {
        return response()->json(Company::all());
    }

    public function store(ProductionCompanyRequest $request): JsonResponse
    {
        $data = $request->validated();
        $company = Company::create($data);
        return response()->json($company, 201);
    }

    public function show($id): JsonResponse
    {
        $local = Company::find($id);

        if (is_null($local) || is_null($local["logo_path"]) || $local["updated_at"]->diffInHours() > 24) {
            try {
                $tmdb = $this->tmdbClient->getCompany($id);
            } catch (\Exception $e) {
                return response()->json(status: 404);
            }

            $toUpdate = [
                "name" => $tmdb["name"],
                "logo_path" => $tmdb["logo_path"],
                "origin_country" => $tmdb["origin_country"],
                "homepage" => $tmdb["homepage"],
            ];

            $local = Company::updateOrCreate(['id' => $id], $toUpdate);

        }

        return response()->json($local);
    }

    public function update(ProductionCompanyRequest $request, $id): JsonResponse
    {
        $company = Company::findOrFail($id);
        $data = $request->validated();
        $company->update($data);
        return response()->json($company);
    }

    public function destroy($id): JsonResponse
    {
        Company::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Person::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id'         => 'required|numeric',
            'adult'      => 'required|boolean',
            'name'       => 'required|string',
            'popularity' => 'required|numeric',
        ]);

        $person = Person::create($data);
        return response()->json($person, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(Person::findOrFail($id));
    }

    public function update(Request $request, $id): JsonResponse
    {
        $person = Person::findOrFail($id);
        $data = $request->validate([
            'adult'      => 'sometimes|boolean',
            'name'       => 'sometimes|string',
            'popularity' => 'sometimes|numeric',
        ]);

        $person->update($data);
        return response()->json($person);
    }

    public function destroy($id): JsonResponse
    {
        Person::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Http\Requests\PersonRequest;
use Illuminate\Http\JsonResponse;

class PersonController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Person::all());
    }

    public function store(PersonRequest $request): JsonResponse
    {
        $data = $request->validated();
        $person = Person::create($data);
        return response()->json($person, 201);
    }

    public function show($id): JsonResponse
    {
        return response()->json(Person::findOrFail($id));
    }

    public function update(PersonRequest $request, $id): JsonResponse
    {
        $person = Person::findOrFail($id);
        $data = $request->validated();
        $person->update($data);
        return response()->json($person);
    }

    public function destroy($id): JsonResponse
    {
        Person::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

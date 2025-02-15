<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonRequest;
use App\Models\Person;
use Illuminate\Http\JsonResponse;

class PersonController extends TmdbController
{
    public function index(): JsonResponse
    {
        return response()->json(Person::all());
    }


    public function show($id): JsonResponse
    {
        $local = Person::find($id);

        if (is_null($local) || is_null($local["profile_path"]) || $local["updated_at"]->diffInHours() > 24) {
            try {
                $tmdb = $this->tmdbClient->getPerson($id);
            } catch (\Exception $e) {
                return response()->json(status: 404);
            }

            $toUpdate = [
                "name" => $tmdb["name"],
                "profile_path" => $tmdb["profile_path"],
                "biography" => $tmdb["biography"],
                "birthday" => $tmdb["birthday"],
                "deathday" => $tmdb["deathday"],
                "place_of_birth" => $tmdb["place_of_birth"],
                "popularity" => $tmdb["popularity"],
                "adult" => $tmdb["adult"],
                "also_known_as" => $tmdb["also_known_as"],
                "known_for_department" => $tmdb["known_for_department"],
            ];

            $local = Person::updateOrCreate(['id' => $id], $toUpdate);

        }
        return response()->json($local);
    }

    public
    function update(PersonRequest $request, $id): JsonResponse
    {
        $person = Person::findOrFail($id);
        $data = $request->validated();
        $person->update($data);
        return response()->json($person);
    }

    public
    function destroy($id): JsonResponse
    {
        Person::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

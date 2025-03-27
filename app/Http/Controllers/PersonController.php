<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PersonController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Person();
        $this->allowedFilters = ["id", "name"];
        $this->columns = ['id', 'name', "imdb_id", 'biography', 'birthday', "place_of_birth", 'deathday', "homepage", "gender", "profile", "popularity", "still", "also_known_as", "known_for_department"];
    }

    public function show(string $id): JsonResponse
    {
        $record = $this->model::with([
            'credits.occupation' => function ($query) {
                $query->select(['id', 'name']);
            }, 'credits.movie' => function ($query) {
                $query->select(['id', 'title', 'poster', 'release_date', 'runtime', 'original_title', 'title_sort', 'popularity', 'vote_average', 'vote_count']);
                $query->setEagerLoads([]);
            }, 'credits.tv' => function ($query) {
                $query->select(['id', 'name', 'poster', 'first_air_date', 'last_air_date', 'original_name', 'popularity', 'vote_average', 'vote_count']);
                $query->setEagerLoads([]);
            }])
            ->find($id);

        return response()->json($record);
    }

    public function userFollow(Request $request, $person_id): JsonResponse
    {
        $user = $request->user();
        $person = $this->model::find($person_id);

        if (!$person) {
            return response()->json(["message" => "Person not found"], 404);
        }

        if ($user->personFollow()->where('person_id', $person->id)->exists()) {
            return response()->json(["message" => "You are already following '$person->name'"], 409);
        }

        $user->personFollow()->attach($person->id);

        return response()->json(['message' => "You are now following '$person->name'"]);
    }

    public function userUnfollow(Request $request, $person_id): JsonResponse
    {
        $person = Person::where('id', $person_id)->first();
        if (!$person) return response()->json(["message" => "Person not found"], 404);

        $user = $request->user();

        if (!$user->personFollow()->where('person_id', $person->id)->exists()) {
            return response()->json(["message" => "You are not following this '$person->name'"], 409);
        }

        $user->personFollow()->detach($person->id);

        return response()->json(['message' => "You are no longer following '$person->name'"], 204);
    }
}

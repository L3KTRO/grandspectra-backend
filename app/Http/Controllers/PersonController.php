<?php

namespace App\Http\Controllers;

use App\Models\Movie;
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

    public function meili(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            "sort_by" => 'nullable|string|in:popularity,vote_average,vote_count',
            "sort_dir" => 'nullable|string|in:asc,desc',
        ]);

        $items = Person::search($validated["search"] ?? "")
            ->orderBy($validated["sort_by"] ?? 'popularity', $validated["sort_dir"] ?? 'desc');

        return response()->json($items->paginate(10));

    }
}

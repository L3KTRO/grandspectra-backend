<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Tv;
use App\Services\Tmdb\TMDBScraper;
use App\Traits\MediaFilterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TvController extends ReadOnlyController
{
    use MediaFilterTrait;

    public function __construct()
    {
        $this->model = new Tv();
        $this->allowedFilters = ["name", "id", "overview", "number_of_episodes", "number_of_seasons", "first_air_date", "last_air_date", "next_episode_to_air", "popularity", "status", "vote_average", "vote_count", "poster"];
        $this->columns = ['id', 'imdb_id', "tvdb_id", 'type', 'name', 'name_sort', 'overview', 'number_of_episodes', 'number_of_seasons', 'episode_run_time', 'first_air_date', 'homepage', 'in_production', 'last_air_date', 'next_episode_to_air', "origin_country", "original_language", "original_name", "popularity", "poster", "backdrop", "status", "vote_average", "vote_count", "trailer"];
    }

    public function index(Request $request): JsonResponse
    {
        $query = $this->model->query();
        $shows = $this->paginateResults($query, $request);

        return response()->json($shows);
    }


    public function update(string $contentId): JsonResponse
    {
        $tmdbScraper = new TMDBScraper();
        $tmdbScraper->tvPriority($contentId);
        return response()->json([
            'message' => 'The job has been dispatched to high priority queue',
            'content_id' => $contentId
        ]);
    }

    public function meili(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            "sort_by" => 'nullable|string|in:popularity,vote_average,vote_count',
            "sort_dir" => 'nullable|string|in:asc,desc',
            "genres" => 'nullable|array|exists:genres,name',
        ]);

        $items = Tv::search($validated["search"] ?? "")
            ->orderBy($validated["sort_by"] ?? 'popularity', $validated["sort_dir"] ?? 'desc');

        if ($request->has('genres')) {
            $items->whereIn('genres', $validated["genres"]);
        }

        return response()->json($items->paginate(10));

    }
}

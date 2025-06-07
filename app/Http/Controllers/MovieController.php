<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Services\Tmdb\TMDBScraper;
use App\Traits\MediaFilterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;

class MovieController extends ReadOnlyController
{
    use MediaFilterTrait;

    public function __construct()
    {
        $this->model = new Movie();
        $this->allowedFilters = ["id", "title", "release_date", "original_title", "popularity", "vote_average", "vote_count"];
        $this->columns = ['id', 'title', 'overview', 'release_date', 'poster', 'backdrop', 'runtime', 'budget', 'revenue', 'imdb_id', 'tmdb_id', 'original_language', 'original_title', "title", "title_sort", 'popularity', 'vote_average', 'vote_count', "trailer", "tagline"];
    }

    public function index(Request $request): JsonResponse
    {
        $query = $this->model->query();

        $movies = $this->paginateResults($query, $request);

        return response()->json($movies);
    }

    public function update(string $contentId): JsonResponse
    {
        $tmdbScraper = new TMDBScraper();
        $tmdbScraper->moviePriority($contentId);
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

        $items = Movie::search($validated["search"] ?? "")
            ->orderBy($validated["sort_by"] ?? 'popularity', $validated["sort_dir"] ?? 'desc');

        if ($request->has('genres')) {
            $items->whereIn('genres', $validated["genres"]);
        }

        return response()->json($items->paginate(10));

    }
}

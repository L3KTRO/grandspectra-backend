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

        // Aplicar filtrado por título (específico de películas)
        if ($request->has('title')) {
            $query->where('title', 'LIKE', $request->title . '%');
        }

        // Aplicar filtrados de fecha específicos de películas
        if ($request->has('release_date_gt')) {
            $query->where('release_date', '>', $request->release_date_gt);
        }
        if ($request->has('release_date_lt')) {
            $query->where('release_date', '<', $request->release_date_lt);
        }

        // Aplicar filtros comunes desde el trait
        $this->applyNumericFilters($query, $request);
        $this->applyIdFilters($query, $request);
        $this->applyGenreFilters($query, $request);
        $this->applySorting($query, $request);

        // Paginar y retornar resultados
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
}

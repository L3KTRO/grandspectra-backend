<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Services\Tmdb\TMDBScraper;
use App\Traits\MediaFilterTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MovieController extends ReadOnlyController
{
    use MediaFilterTrait;

    public function __construct()
    {
        $this->model = new Movie;
        $this->allowedFilters = ['id', 'title', 'release_date', 'original_title', 'popularity', 'vote_average', 'vote_count'];
        $this->columns = ['id', 'title', 'overview', 'release_date', 'poster', 'backdrop', 'runtime', 'budget', 'revenue', 'imdb_id', 'tmdb_id', 'original_language', 'original_title', 'title', 'title_sort', 'popularity', 'vote_average', 'vote_count', 'trailer', 'tagline'];
    }

    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'sort_by' => 'nullable|string|in:popularity,vote_average,vote_count',
            'sort_dir' => 'nullable|string|in:asc,desc',
            'genres' => 'nullable|array',
            'genres.*' => 'exists:genres,name',
            'per_page' => 'nullable|integer|min:1|max:100',
            'popularity_gt' => 'nullable|numeric',
            'popularity_lt' => 'nullable|numeric',
            'vote_average_gt' => 'nullable|numeric',
            'vote_average_lt' => 'nullable|numeric',
            'vote_count_gt' => 'nullable|integer',
            'vote_count_lt' => 'nullable|integer',
        ]);

        // Usar Scout para búsqueda full-text
        $search = Movie::search($validated['search'] ?? '')
            ->query(fn ($builder) => $this->applyScoutFilters($builder, $validated));

        // Aplicar ordenamiento
        $sortBy = $validated['sort_by'] ?? 'popularity';
        $sortDir = $validated['sort_dir'] ?? 'desc';
        $search->orderBy($sortBy, $sortDir);

        // Paginar resultados
        $perPage = $validated['per_page'] ?? 10;
        $movies = $search->paginate($perPage);

        return response()->json($movies);
    }

    /**
     * Aplica filtros de Meilisearch usando la sintaxis nativa
     */
    protected function applyScoutFilters($builder, array $filters): void
    {
        $conditions = [];

        // Filtros de géneros
        if (! empty($filters['genres'])) {
            $genreConditions = array_map(fn ($genre) => "genres = '{$genre}'", $filters['genres']);
            $conditions[] = '('.implode(' OR ', $genreConditions).')';
        }

        // Filtros numéricos
        if (isset($filters['popularity_gt'])) {
            $conditions[] = "popularity > {$filters['popularity_gt']}";
        }
        if (isset($filters['popularity_lt'])) {
            $conditions[] = "popularity < {$filters['popularity_lt']}";
        }
        if (isset($filters['vote_average_gt'])) {
            $conditions[] = "vote_average > {$filters['vote_average_gt']}";
        }
        if (isset($filters['vote_average_lt'])) {
            $conditions[] = "vote_average < {$filters['vote_average_lt']}";
        }
        if (isset($filters['vote_count_gt'])) {
            $conditions[] = "vote_count > {$filters['vote_count_gt']}";
        }
        if (isset($filters['vote_count_lt'])) {
            $conditions[] = "vote_count < {$filters['vote_count_lt']}";
        }

        // Aplicar filtros si existen
        if (! empty($conditions)) {
            $builder->filter(implode(' AND ', $conditions));
        }
    }

    public function update(string $contentId): JsonResponse
    {
        $tmdbScraper = new TMDBScraper;
        $tmdbScraper->moviePriority($contentId);

        return response()->json([
            'message' => 'The job has been dispatched to high priority queue',
            'content_id' => $contentId,
        ]);
    }
}

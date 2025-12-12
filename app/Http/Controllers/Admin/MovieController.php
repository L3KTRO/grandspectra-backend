<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Traits\AppliesSorting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    use AppliesSorting;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Movie::query()
            ->select([
                'id',
                'title',
                'original_title',
                'tmdb_id',
                'release_date',
                'poster',
                'popularity',
                'vote_average',
                'created_at',
            ])
            ->with('genres:id,name');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('original_title', 'like', "%{$search}%")
                    ->orWhere('tmdb_id', 'like', "%{$search}%");
            });
        }

        [$movies, $sort, $direction] = $this->applySorting(
            $request,
            $query,
            ['title', 'release_date', 'popularity', 'vote_average', 'created_at'],
            'created_at',
            'desc'
        );

        return Inertia::render('movies/index', [
            'movies' => $movies,
            'filters' => [
                'search' => $request->input('search'),
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('movies/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'original_title' => 'nullable|string|max:255',
            'tmdb_id' => 'nullable|string|max:255|unique:movies,tmdb_id',
            'imdb_id' => 'nullable|string|max:255',
            'overview' => 'nullable|string',
            'release_date' => 'nullable|date',
            'runtime' => 'nullable|integer|min:0',
            'poster' => 'nullable|string|max:255',
            'backdrop' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:50',
            'tagline' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
            'revenue' => 'nullable|string|max:255',
            'popularity' => 'nullable|numeric',
            'vote_average' => 'nullable|numeric',
            'vote_count' => 'nullable|integer',
            'adult' => 'nullable|boolean',
            'homepage' => 'nullable|url|max:255',
            'original_language' => 'nullable|string|max:10',
            'trailer' => 'nullable|string|max:255',
        ]);

        // Generar title_sort automáticamente
        $validated['title_sort'] = $this->generateTitleSort($validated['title']);

        $movie = Movie::create($validated);

        return redirect()->route('dashboard.movies.index')
            ->with('success', 'Película creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        $movie->load(['genres', 'credits.person', 'companies', 'reviews.user']);

        return Inertia::render('movies/show', [
            'movie' => $movie,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movie $movie)
    {
        $movie->load('genres');

        return Inertia::render('movies/edit', [
            'movie' => $movie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'original_title' => 'nullable|string|max:255',
            'tmdb_id' => 'nullable|string|max:255|unique:movies,tmdb_id,'.$movie->id,
            'imdb_id' => 'nullable|string|max:255',
            'overview' => 'nullable|string',
            'release_date' => 'nullable|date',
            'runtime' => 'nullable|integer|min:0',
            'poster' => 'nullable|string|max:255',
            'backdrop' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:50',
            'tagline' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
            'revenue' => 'nullable|string|max:255',
            'popularity' => 'nullable|numeric',
            'vote_average' => 'nullable|numeric',
            'vote_count' => 'nullable|integer',
            'adult' => 'nullable|boolean',
            'homepage' => 'nullable|url|max:255',
            'original_language' => 'nullable|string|max:10',
            'trailer' => 'nullable|string|max:255',
        ]);

        // Actualizar title_sort si el título cambió
        if ($validated['title'] !== $movie->title) {
            $validated['title_sort'] = $this->generateTitleSort($validated['title']);
        }

        $movie->update($validated);

        return redirect()->route('dashboard.movies.index')
            ->with('success', 'Película actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();

        return redirect()->route('dashboard.movies.index')
            ->with('success', 'Película eliminada exitosamente.');
    }

    /**
     * Generate title_sort by removing articles
     */
    private function generateTitleSort(string $title): string
    {
        $articles = ['The ', 'A ', 'An ', 'El ', 'La ', 'Los ', 'Las ', 'Un ', 'Una '];

        foreach ($articles as $article) {
            if (stripos($title, $article) === 0) {
                return substr($title, strlen($article));
            }
        }

        return $title;
    }
}

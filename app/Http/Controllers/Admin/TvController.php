<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tv;
use App\Traits\AppliesSorting;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TvController extends Controller
{
    use AppliesSorting;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Tv::query()->with('genres');

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('original_name', 'like', "%{$search}%")
                    ->orWhere('tmdb_id', 'like', "%{$search}%")
                    ->orWhere('tvdb_id', 'like', "%{$search}%");
            });
        }

        [$shows, $sort, $direction] = $this->applySorting(
            $request,
            $query,
            ['name', 'first_air_date', 'popularity', 'vote_average', 'created_at'],
            'created_at',
            'desc'
        );

        return Inertia::render('tv/index', [
            'shows' => $shows,
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
        return Inertia::render('tv/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $this->validateTv($request);

        $validated['name_sort'] = $this->generateNameSort($validated['name']);
        $validated['in_production'] = (bool) ($validated['in_production'] ?? false);

        Tv::create($validated);

        return redirect()->route('dashboard.tv.index')
            ->with('success', 'Serie creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tv $tv)
    {
        $tv->load(['genres', 'networks', 'companies', 'seasons', 'credits.person', 'creators', 'reviews.user']);

        return Inertia::render('tv/show', [
            'show' => $tv,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tv $tv)
    {
        $tv->load('genres');

        return Inertia::render('tv/edit', [
            'show' => $tv,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tv $tv)
    {
        $validated = $this->validateTv($request, $tv);

        if ($validated['name'] !== $tv->name) {
            $validated['name_sort'] = $this->generateNameSort($validated['name']);
        }

        $validated['in_production'] = (bool) ($validated['in_production'] ?? false);

        $tv->update($validated);

        return redirect()->route('dashboard.tv.index')
            ->with('success', 'Serie actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tv $tv)
    {
        $tv->delete();

        return redirect()->route('dashboard.tv.index')
            ->with('success', 'Serie eliminada exitosamente.');
    }

    private function validateTv(Request $request, ?Tv $tv = null): array
    {
        $tvId = $tv?->id;

        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'original_name' => ['nullable', 'string', 'max:255'],
            'tmdb_id' => ['nullable', 'string', 'max:255', Rule::unique('tv', 'tmdb_id')->ignore($tvId)],
            'imdb_id' => ['nullable', 'string', 'max:255', Rule::unique('tv', 'imdb_id')->ignore($tvId)],
            'tvdb_id' => ['nullable', 'string', 'max:255', Rule::unique('tv', 'tvdb_id')->ignore($tvId)],
            'type' => ['nullable', 'string', 'max:255'],
            'overview' => ['nullable', 'string'],
            'number_of_episodes' => ['nullable', 'integer', 'min:0'],
            'count_existing_episodes' => ['nullable', 'integer', 'min:0'],
            'count_total_episodes' => ['nullable', 'integer', 'min:0'],
            'number_of_seasons' => ['nullable', 'integer', 'min:0'],
            'episode_run_time' => ['nullable', 'string', 'max:255'],
            'first_air_date' => ['nullable', 'date'],
            'status' => ['nullable', 'string', 'max:255'],
            'homepage' => ['nullable', 'url', 'max:255'],
            'in_production' => ['nullable', 'boolean'],
            'last_air_date' => ['nullable', 'date'],
            'next_episode_to_air' => ['nullable', 'string', 'max:255'],
            'origin_country' => ['nullable', 'string', 'max:255'],
            'original_language' => ['nullable', 'string', 'max:50'],
            'popularity' => ['nullable', 'numeric', 'min:0'],
            'backdrop' => ['nullable', 'string', 'max:255'],
            'poster' => ['nullable', 'string', 'max:255'],
            'vote_average' => ['nullable', 'numeric', 'min:0', 'max:10'],
            'vote_count' => ['nullable', 'integer', 'min:0'],
            'trailer' => ['nullable', 'string', 'max:255'],
        ]);
    }

    private function generateNameSort(string $name): string
    {
        $articles = ['The ', 'A ', 'An ', 'El ', 'La ', 'Los ', 'Las ', 'Un ', 'Una '];

        foreach ($articles as $article) {
            if (stripos($name, $article) === 0) {
                return substr($name, strlen($article));
            }
        }

        return $name;
    }
}

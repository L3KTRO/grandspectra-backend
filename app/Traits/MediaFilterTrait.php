<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait MediaFilterTrait
{

    /**
     * Aplica filtros numéricos (greater than/less than)
     */
    protected function applyNumericFilters(Builder $query, Request $request): void
    {
        $numericFields = ['popularity', 'vote_average', 'vote_count'];

        foreach ($numericFields as $field) {
            if ($request->has("{$field}_gt")) {
                $query->where($field, '>', $request->{"{$field}_gt"});
            }

            if ($request->has("{$field}_lt")) {
                $query->where($field, '<', $request->{"{$field}_lt"});
            }
        }
    }

    /**
     * Aplica ordenamiento
     */
    protected function applySorting(Builder $query, Request $request): void
    {
        $sortableFields = ['popularity', 'vote_average', 'vote_count'];

        if ($request->has('sort_by') && in_array($request->sort_by, $sortableFields)) {
            $sortDir = $request->has('sort_dir') && strtolower($request->sort_dir) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($request->sort_by, $sortDir);
        } else {
            $query->orderBy('popularity', 'desc');
        }
    }

    /**
     * Aplica filtros de ID
     */
    protected function applyIdFilters(Builder $query, Request $request): void
    {
        $idFields = ['imdb_id', 'tmdb_id'];

        foreach ($idFields as $field) {
            if ($request->has($field)) {
                $query->where($field, $request->$field);
            }
        }
    }

    /**
     * Aplica filtros de géneros
     */
    protected function applyGenreFilters(Builder $query, Request $request): void
    {
        if ($request->has('genres')) {
            $genres = is_array($request->genres) ? $request->genres : [$request->genres];
            $query->whereHas('genres', function ($q) use ($genres) {
                $q->whereIn('genres.id', $genres);
            });
        }
    }

    /**
     * Realiza la paginación
     */
    protected function paginateResults(Builder $query, Request $request)
    {
        $perPage = $request->has('per_page') ? (int)$request->per_page : 10;
        return $query->paginate($perPage);
    }
}

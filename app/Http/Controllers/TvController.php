<?php

namespace App\Http\Controllers;

use App\Models\Tv;
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

        $query = $this->model->query()->with("genres")
            ->whereDoesntHave("genres", function ($query) {
                $query->where("genres.id", 10767);
            })
            ->whereDoesntHave("genres", function ($query) {
                $query->where("genres.id", 10763);
            })
            ->whereDoesntHave("genres", function ($query) {
                $query->where("genres.id", 10766);
            })
            ->whereDoesntHave("genres", function ($query) {
                $query->where("genres.id", 10764);
            });

        // Aplicar filtrado por nombre (específico de series TV)
        if ($request->has('name')) {
            $query->where('name', 'LIKE', $request->name . '%');
        }

        // Aplicar filtrados de fecha específicos de series TV
        if ($request->has('first_air_date_gt')) {
            $query->where('first_air_date', '>', $request->first_air_date_gt);
        }
        if ($request->has('first_air_date_lt')) {
            $query->where('first_air_date', '<', $request->first_air_date_lt);
        }

        if ($request->has('last_air_date_gt')) {
            $query->where('last_air_date', '>', $request->last_air_date_gt);
        }
        if ($request->has('last_air_date_lt')) {
            $query->where('last_air_date', '<', $request->last_air_date_lt);
        }

        // Filtrado específico de TV para tvdb_id
        if ($request->has('tvdb_id')) {
            $query->where('tvdb_id', $request->tvdb_id);
        }

        // Aplicar filtros comunes desde el trait
        $this->applyNumericFilters($query, $request);
        $this->applyIdFilters($query, $request);
        $this->applyGenreFilters($query, $request);
        $this->applySorting($query, $request);

        // Paginar y retornar resultados
        $shows = $this->paginateResults($query, $request);

        return response()->json($shows);
    }
}

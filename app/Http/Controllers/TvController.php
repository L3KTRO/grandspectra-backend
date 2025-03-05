<?php

namespace App\Http\Controllers;

use App\Models\Tv;
use Illuminate\Http\Request;

class TvController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Tv();
        $this->allowedFilters = ["name", "id", "overview", "name_sort", "number_of_episodes", "number_of_seasons", "first_air_date", "last_air_date", "next_episode_to_air", "origin_country", "original_language", "original_name", "popularity", "status", "vote_average", "vote_count"];
        $this->columns = ['id', 'imdb_id', "tvdb_id", 'type', 'name', 'name_sort', 'overview', 'number_of_episodes', 'number_of_seasons', 'episode_run_time', 'first_air_date', 'homepage', 'in_production', 'last_air_date', 'next_episode_to_air', "origin_country", "original_language", "original_name", "popularity", "poster", "backdrop", "status", "vote_average", "vote_count", "trailer"];
    }
}

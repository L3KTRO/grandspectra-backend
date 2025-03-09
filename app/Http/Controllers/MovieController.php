<?php

namespace App\Http\Controllers;

use App\Models\Credit;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MovieController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Movie();
        $this->allowedFilters = ["title", "id"];
        $this->columns = ['id', 'title', 'overview', 'release_date', 'poster', 'backdrop', 'runtime', 'budget', 'revenue', 'imdb_id', 'tmdb_id', 'original_language', 'original_title', "title", "title_sort", 'popularity', 'vote_average', 'vote_count', "trailer"];
    }
}

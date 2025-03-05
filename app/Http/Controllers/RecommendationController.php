<?php

namespace App\Http\Controllers;

use App\Models\Recommendation;
use Illuminate\Http\Request;

class RecommendationController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Recommendation();
        $this->allowedFilters = ["movie_id", "tv_id", "person_id", "occupation_id"];
        $this->columns = ['id', "title", "poster", 'vote_average', "release_date", "movie_id", "recommendation_movie_id", "tv_id", "recommendation_tv_id"];
    }
}

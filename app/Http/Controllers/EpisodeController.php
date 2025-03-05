<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use Illuminate\Http\Request;

class EpisodeController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Episode();
        $this->allowedFilters = ["tv_id", "season_id", "episode_number"];
        $this->columns = ['id', 'tv_id', 'season_id', 'episode_number', 'name', 'overview', 'still', 'air_date', 'vote_average', 'vote_count'];
    }
}

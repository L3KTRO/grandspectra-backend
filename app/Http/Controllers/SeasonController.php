<?php

namespace App\Http\Controllers;

use App\Models\Season;
use Illuminate\Http\Request;

class SeasonController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Season();
        $this->allowedFilters = ["tv_id", "name"];
        $this->columns = ['id', 'tv_id', 'season_number', "name", "overview", "poster", "air_date"];
    }
}

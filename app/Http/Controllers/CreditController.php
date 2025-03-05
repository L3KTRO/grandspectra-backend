<?php

namespace App\Http\Controllers;

use App\Models\Credit;
use Illuminate\Http\Request;

class CreditController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Credit();
        $this->allowedFilters = ["movie_id", "tv_id", "person_id", "occupation_id"];
        $this->columns = ['id', 'person_id', 'movie_id', 'tv_id', 'occupation_id', "order", 'character'];
    }
}

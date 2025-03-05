<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Genre();
        $this->allowedFilters = ["name", "id"];
        $this->columns = ['id', 'name'];
    }
}

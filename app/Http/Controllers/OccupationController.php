<?php

namespace App\Http\Controllers;

use App\Models\Occupation;
use Illuminate\Http\Request;

class OccupationController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Occupation();
        $this->allowedFilters = ["name"];
        $this->columns = ['id', 'name', "position"];
    }
}

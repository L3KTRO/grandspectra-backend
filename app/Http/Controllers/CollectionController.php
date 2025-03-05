<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;

class CollectionController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Collection();
        $this->allowedFilters = ["name_sort"];
        $this->columns = ['id', 'name', 'name_sort', 'parts', 'overview', 'poster', 'backdrop', 'created_at', 'updated_at'];
    }
}

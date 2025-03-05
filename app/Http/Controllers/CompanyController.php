<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends ReadOnlyController
{
    public function __construct()
    {
        $this->model = new Company();
        $this->allowedFilters = ["name"];
        $this->columns = ['id', 'name', 'description', 'headquarters', 'homepage', "logo", 'origin_country'];
    }
}

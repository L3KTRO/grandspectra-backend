<?php

namespace App\Http\Controllers;

use App\Models\TitleCrew;

class TitleCrewController extends BaseController
{
    public function __construct()
    {
        parent::__construct(new TitleCrew, [
            'tconst' => 'required|string|max:512|unique:title_crew',
            'directors' => 'nullable|string',
            'writers' => 'nullable|string'
        ]);
    }
}

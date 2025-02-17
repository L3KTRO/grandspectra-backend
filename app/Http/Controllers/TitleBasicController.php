<?php

namespace App\Http\Controllers;

use App\Models\TitleBasic;

class TitleBasicController extends BaseController
{
    public function __construct()
    {
        parent::__construct(new TitleBasic, [
            'tconst' => 'required|string|max:512|unique:title_basics',
            'titleType' => 'nullable|string|max:512',
            'primaryTitle' => 'nullable|string|max:512',
            'originalTitle' => 'nullable|string|max:512',
            'startYear' => 'nullable|integer',
            'endYear' => 'nullable|integer',
            'runtimeMinutes' => 'nullable|integer',
            'genres' => 'nullable|string|max:512'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\NameBasic;

class NameBasicController extends BaseController
{
    public function __construct()
    {
        parent::__construct(new NameBasic, [
            'nconst' => 'required|string|max:512|unique:name_basics',
            'primaryName' => 'nullable|string|max:512',
            'birthYear' => 'nullable|integer',
            'deathYear' => 'nullable|integer',
            'primaryProfession' => 'nullable|string|max:512',
            'knownForTitles' => 'nullable|string|max:512'
        ]);
    }
}

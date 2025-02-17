<?php

namespace App\Http\Controllers;

use App\Models\TitlePrincipal;

class TitlePrincipalController extends BaseController
{
    public function __construct()
    {
        parent::__construct(new TitlePrincipal, [
            'tconst' => 'required|string|max:512',
            'ordering' => 'required|integer|min:1',
            'nconst' => 'required|string|max:512',
            'category' => 'nullable|string|max:255',
            'job' => 'nullable|string',
            'characters' => "nullable|string"
        ]);
    }
}

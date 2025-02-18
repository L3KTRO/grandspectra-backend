<?php

namespace App\Http\Controllers;

use App\Models\TitleAka;

class TitleAkaController extends BaseControllerReadOnly
{
    public function __construct()
    {
        parent::__construct(new TitleAka, [
            'titleId' => 'required|string|max:512',
            'ordering' => 'required|integer',
            'title' => 'nullable|string|max:512',
            'region' => 'nullable|string|max:512',
            'language' => 'nullable|string|max:512',
            'types' => 'nullable|string',
            'attributes' => 'nullable|string',
            'isOriginalTitle' => 'nullable|boolean'
        ]);
    }
}

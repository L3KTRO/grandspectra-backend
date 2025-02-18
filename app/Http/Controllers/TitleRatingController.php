<?php

namespace App\Http\Controllers;

use App\Models\TitleRating;

class TitleRatingController extends BaseControllerReadOnly
{
    public function __construct()
    {
        parent::__construct(new TitleRating, [
            'tconst' => 'required|string|max:512|unique:title_ratings',
            'averageRating' => 'nullable|numeric|min:0|max:10',
            'numVotes' => 'nullable|integer|min:0'
        ]);
    }
}

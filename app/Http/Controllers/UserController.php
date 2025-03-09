<?php

// app/Http/Controllers/Auth/UserController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Rating;
use App\Models\Tv;
use App\Models\Watched;
use App\Models\Watchlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        $ratings = Rating::where('user_id', $user->id)->get();
        $watched = Watched::where('user_id', $user->id)->get();
        $watchlist = Watchlist::where('user_id', $user->id)->get();

        return response()->json([
            'user' => $request->user(),
            "contents" => [
                "ratings" => $this->formatContent($ratings),
                "watched" => $this->formatContent($watched),
                "watchlist" => $this->formatContent($watchlist)
            ]
        ]);
    }

    private function formatContent($content)
    {
        $loaded = [];
        foreach ($content as $c) {
            if ($c->movie_id) {
                $c->loaded = Movie::find($c->movie_id);
                array_push($loaded, $c);
            } else {
                $c->loaded = Tv::find($c->tv_id);
                array_push($loaded, $c);
            }
        };

        return $loaded;
    }
}


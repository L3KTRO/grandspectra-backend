<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Movie;
use App\Models\Tv;
use App\Models\Review;
use App\Models\Rating;
use App\Models\Watchlist;
use App\Models\Watched;
use App\Models\ContentList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'users' => User::count(),
            'movies' => Movie::count(),
            'tv_shows' => Tv::count(),
            'reviews' => Review::count(),
            'ratings' => Rating::count(),
            'watchlists' => Watchlist::count(),
            'watched' => Watched::count(),
            'content_lists' => ContentList::count(),
            'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'username', 'created_at']),
            'recent_reviews' => Review::with('user:id,name,username')
                ->latest()
                ->take(5)
                ->get(['id', 'user_id', 'content', 'qualification', 'created_at']),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    }
}

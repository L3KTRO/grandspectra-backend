<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Movie;
use App\Models\Tv;
use App\Models\Review;
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
            'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'created_at']),
            'recent_reviews' => Review::with('user:id,name')
                ->latest()
                ->take(5)
                ->get(['id', 'user_id', 'content', 'rating', 'created_at']),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}

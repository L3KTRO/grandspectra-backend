<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\OccupationController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\PersonFollowController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\TvController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WatchedController;
use App\Http\Controllers\WatchlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Definición de rutas API
Route::apiResource('movies', MovieController::class);
Route::apiResource('genres', GenreController::class);
Route::apiResource('people', PersonController::class);
Route::apiResource('tv', TvController::class);
Route::apiResource('users', UserController::class);

// Rutas de autenticación
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('me')->group(function () {
        Route::get("/", [UserController::class, 'me']);
        Route::apiResource('ratings', RatingController::class);
        Route::apiResource('reviews', ReviewController::class);
        Route::apiResource('watched', WatchedController::class);
        Route::apiResource('watchlist', WatchlistController::class);
        Route::apiResource('follow', FollowController::class);
        Route::apiResource('person', PersonFollowController::class);
    });
});

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\OccupationController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\RatingController;
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
Route::apiResource('credits', CreditController::class);
Route::apiResource('people', PersonController::class);
Route::apiResource('occupations', OccupationController::class);
Route::apiResource('tv', TvController::class);
Route::apiResource('seasons', SeasonController::class);
Route::apiResource('episodes', EpisodeController::class);

// Rutas de autenticación
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get("/me", [UserController::class, 'me']);

    Route::prefix('me')->group(function () {
        Route::apiResource('ratings', RatingController::class)
            ->only(['store', 'update', 'destroy']);

        Route::apiResource('watched', WatchedController::class)
            ->only(['store', 'destroy']);

        Route::apiResource('watchlist', WatchlistController::class)
            ->only(['store', 'destroy']);

        // Método especial para toggle
        Route::post('watched/toggle', [WatchedController::class, 'toggle']);
    });
});

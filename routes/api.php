<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\OccupationController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\TvController;
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


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
});

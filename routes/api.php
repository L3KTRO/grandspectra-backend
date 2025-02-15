<?php

use App\Http\Controllers\KeywordController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProductionCompanyController;
use App\Http\Controllers\TmdbCollectionController;
use App\Http\Controllers\TvNetworkController;
use App\Http\Controllers\TvSeriesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RatingController;

// Definición de rutas API
Route::apiResource('users', UserController::class);
Route::apiResource('ratings', RatingController::class);
Route::apiResource('movies', MovieController::class);
Route::apiResource('people', PersonController::class);
Route::apiResource('tmdb-collections', TmdbCollectionController::class);
Route::apiResource('tv-series', TvSeriesController::class);
Route::apiResource('keywords', KeywordController::class);
Route::apiResource('company', ProductionCompanyController::class);
Route::apiResource('tv-networks', TvNetworkController::class);


// Special routes

Route::get('popular/movies', [MovieController::class, 'indexByPopularity']);

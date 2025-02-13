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
Route::apiResource('production-companies', ProductionCompanyController::class);
Route::apiResource('tv-networks', TvNetworkController::class);


// Adicionales

Route::post('keywords/create-or-update', [KeywordController::class, 'createOrUpdate']);
Route::options('movies/create-or-update', [MovieController::class, 'createOrUpdate']);
Route::post('people/create-or-update', [PersonController::class, 'createOrUpdate']);
Route::post('production-companies/create-or-update', [ProductionCompanyController::class, 'createOrUpdate']);
Route::post('ratings/create-or-update', [RatingController::class, 'createOrUpdate']);
Route::post('tmdb-collections/create-or-update', [TmdbCollectionController::class, 'createOrUpdate']);
Route::post('tv-networks/create-or-update', [TvNetworkController::class, 'createOrUpdate']);
Route::post('tv-series/create-or-update', [TvSeriesController::class, 'createOrUpdate']);
Route::post('users/create-or-update', [UserController::class, 'createOrUpdate']);

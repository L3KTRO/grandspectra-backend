<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TitleBasicController;
use App\Http\Controllers\NameBasicController;
use App\Http\Controllers\TitleAkaController;
use App\Http\Controllers\TitleCrewController;
use App\Http\Controllers\TitleRatingController;
use App\Http\Controllers\TitlePrincipalController;

Route::apiResource('titles', TitleBasicController::class);
Route::apiResource('people', NameBasicController::class);
Route::apiResource('akas', TitleAkaController::class);
Route::apiResource('credits', TitleCrewController::class);
Route::apiResource('ratings', TitleRatingController::class);
Route::apiResource('principals', TitlePrincipalController::class);

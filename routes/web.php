<?php


use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('api/verify/{id}', [AuthController::class, 'verifyUser'])->name('verify');

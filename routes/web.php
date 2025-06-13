<?php


use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('verify/{id}', [AuthController::class, 'verifyUser'])->name('verify');

<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::prefix('dashboard')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('users', App\Http\Controllers\Admin\UserController::class)->names([
        'index' => 'dashboard.users.index',
        'create' => 'dashboard.users.create',
        'store' => 'dashboard.users.store',
        'show' => 'dashboard.users.show',
        'edit' => 'dashboard.users.edit',
        'update' => 'dashboard.users.update',
        'destroy' => 'dashboard.users.destroy',
    ]);
    
    Route::resource('movies', App\Http\Controllers\Admin\MovieController::class)->names([
        'index' => 'dashboard.movies.index',
        'create' => 'dashboard.movies.create',
        'store' => 'dashboard.movies.store',
        'show' => 'dashboard.movies.show',
        'edit' => 'dashboard.movies.edit',
        'update' => 'dashboard.movies.update',
        'destroy' => 'dashboard.movies.destroy',
    ]);
    
    Route::resource('tv', App\Http\Controllers\Admin\TvController::class)->names([
        'index' => 'dashboard.tv.index',
        'create' => 'dashboard.tv.create',
        'store' => 'dashboard.tv.store',
        'show' => 'dashboard.tv.show',
        'edit' => 'dashboard.tv.edit',
        'update' => 'dashboard.tv.update',
        'destroy' => 'dashboard.tv.destroy',
    ]);
});

require __DIR__.'/auth.php';

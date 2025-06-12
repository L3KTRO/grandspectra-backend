<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContentListController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\PersonFollowController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TvController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WatchedController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\SearchAllController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Definición de rutas API
Route::apiResource('movies', MovieController::class)->only(['index', 'show', "update"]);
Route::apiResource('genres', GenreController::class)->only(['index', 'show']);
Route::apiResource('people', PersonController::class)->only(['index', 'show']);
Route::apiResource('tv', TvController::class)->only(['index', 'show', "update"]);
Route::apiResource('users', UserController::class)->only(['index', 'show']);
Route::apiResource("lists", ContentListController::class)->only(['index']);

Route::prefix("meili")->group(function () {
    Route::get('all', [SearchAllController::class, 'search']);
    Route::get('media', [SearchAllController::class, 'onlyMedia']);
    Route::get("movies", [MovieController::class, 'meili']);
    Route::get("tv", [TvController::class, 'meili']);
    Route::get("people", [PersonController::class, 'meili']);
});

// Rutas de autenticación
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Rutas que requieren login en (mínimo) alguno de sus métodos
Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/edit', [AuthController::class, 'update']);
    Route::post("auth/resend-verification", [AuthController::class, 'resendVerification']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix("lists")->group(function () {
        Route::apiResource("/", ContentListController::class)->only(["show", 'store', 'update', 'destroy'])->parameter("", "id");
        Route::put('/{id}/vote', [ContentListController::class, 'vote']);
        Route::delete('/{id}/vote', [ContentListController::class, 'unvote']);
        Route::put('/{id}/save', [ContentListController::class, 'save']);
        Route::delete('/{id}/save', [ContentListController::class, 'unsave']);
    });


    Route::prefix('me')->group(function () {
        Route::get("/", [UserController::class, 'me']);
        Route::apiResource('ratings', RatingController::class);
        Route::apiResource('reviews', ReviewController::class);
        Route::apiResource('watched', WatchedController::class);
        Route::apiResource('watchlist', WatchlistController::class);
        Route::apiResource('follow', FollowController::class);
        Route::apiResource('person', PersonFollowController::class);
        Route::prefix("notifications")->group(function () {
            Route::get("/", [NotificationController::class, 'index']);
            Route::post("/{id}/read", [NotificationController::class, 'markAsRead']);
            Route::post("/read-all", [NotificationController::class, 'markAllAsRead']);
            Route::get("/unread-count", [NotificationController::class, 'getUnreadCount']);
        });
    });

});

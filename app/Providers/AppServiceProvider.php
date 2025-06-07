<?php

namespace App\Providers;

use App\Models\Movie;
use App\Models\Person;
use App\Models\Tv;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('viewPulse', function (User $user = null) {
            return true;
        });

        Http::globalOptions([
            'connection_cache' => true,
            'max_connections' => 100,
            'dns_ttl' => 300
        ]);

        Route::middleware('api')
            ->group(base_path('routes/api.php'));

    }
}

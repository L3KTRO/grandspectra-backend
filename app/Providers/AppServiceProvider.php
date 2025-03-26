<?php

namespace App\Providers;

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
        Http::globalOptions([
            'connection_cache' => true,
            'max_connections' => 100,
            'dns_ttl' => 300
        ]);

        Route::middleware('api')
            ->group(base_path('routes/api.php'));

        Gate::define('viewPulse', function () {
            return true;
        });
    }
}

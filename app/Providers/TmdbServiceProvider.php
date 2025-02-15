<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\TmdbClient;

class TmdbServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(TmdbClient::class, function () {
            return new TmdbClient();
        });
    }

    public function boot()
    {
        //
    }
}

<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('horizon:snapshot', function () {
    $this->comment('Horizon snapshot created successfully.');
})->purpose('Create a snapshot of the Horizon dashboard')->everyFiveMinutes();

Artisan::command("tmdb:daily", function () {
    $this->comment("Daily TMDB data update started.");
})->purpose('Update the daily TMDB data')->dailyAt('13:00');

<?php

declare(strict_types=1);

namespace App\Services\Tmdb;

use App\Jobs\ProcessMovieJob;
use App\Jobs\ProcessTvJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class TMDBScraper implements ShouldQueue
{
    use SerializesModels;

    public function __construct()
    {
    }

    public function tv(int $id): void
    {
        ProcessTvJob::dispatch($id)->onQueue("tmdb-tv");
    }

    public function movie(int $id): void
    {
        ProcessMovieJob::dispatch($id)->onQueue("tmdb-movie");
    }

    public function tvPriority(int $id): void
    {
        ProcessTvJob::dispatch($id)->onQueue("tmdb-hp")->withoutDelay();
    }

    public function moviePriority(int $id): void
    {
        ProcessMovieJob::dispatch($id)->onQueue("tmdb-hp")->withoutDelay();
    }
}

<?php

namespace App\Console\Commands;

use App\Jobs\ProcessMovieJob;
use App\Jobs\ProcessTvJob;
use App\Models\Movie;
use App\Models\Tv;
use App\Services\Tmdb\TMDBScraper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TmdbScrap extends Command
{

    protected $signature = 'tmdb:scrap';
    protected $description = 'Scrap TMDB data from specific movie or series ID';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $entity = $this->choice('Select entity:', ["movies", "series"]);
        $id = $this->ask('Enter the ID of the movie or series');

        ini_set('memory_limit', '1024M');

        if ($entity === "movies") {
            ProcessMovieJob::dispatch($id)->onQueue("tmdb-scrap-hp");
        } else {
            ProcessTvJob::dispatch($id)->onQueue("tmdb-scrap-hp");
        }

        $this->info("The job has been dispatched to high priority queue");

        return 0;
    }
}

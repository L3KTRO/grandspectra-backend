<?php

namespace App\Console\Commands;

use App\Jobs\ProcessMovieJob;
use App\Jobs\ProcessTvJob;
use App\Services\Tmdb\TMDBScraper;
use Illuminate\Console\Command;

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

        $tmdbScraper = new TMDBScraper();

        if ($entity === "movies") {
            $tmdbScraper->moviePriority($id);
        } else {
            $tmdbScraper->tvPriority($id);
        }

        $this->info("The job has been dispatched to high priority queue");

        return 0;
    }
}

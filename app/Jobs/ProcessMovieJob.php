<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\Collection;
use App\Models\Company;
use App\Models\Credit;
use App\Models\Genre;
use App\Models\Movie;
use App\Models\Person;
use App\Models\Recommendation;
use App\Services\Tmdb\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessMovieJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * ProcessMovieJob constructor.
     */
    public function __construct(public int $id)
    {
        $this->onConnection('redis');
    }

    public function handle(): void
    {
        try {
            $this->manage();
        } catch (\Exception $e) {
            $this->fail($e);
        }
    }

    public function manage(): void
    {
        // Movie

        $movieScraper = new Client\Movie($this->id);

        if ($movieScraper->data['adult'] === true) {
            Log::info('Adult content detected, skipping movie ID: ' . $this->id);
            return;
        }

        $movie = Movie::updateOrCreate(['id' => $this->id], $movieScraper->getMovie());

        // Genres

        Genre::upsert($movieScraper->getGenres(), 'id');
        $movie->genres()->sync(array_unique(array_column($movieScraper->getGenres(), 'id')));

        // People

        $credits = $movieScraper->getCredits();
        $people = [];

        foreach (array_unique(array_column($credits, 'person_id')) as $person_id) {
            usleep(500000);
            $people[] = (new Client\Person($person_id))->getPerson();
        }

        Person::upsert($people, 'id');
        Credit::where('movie_id', '=', $this->id)->delete();
        Credit::upsert($credits, ['person_id', 'movie_id', 'tv_id', 'occupation_id', 'character']);

        // Companies

        $companies = [];

        foreach ($movieScraper->data['production_companies'] ?? [] as $company) {
            usleep(500000);
            $companies[] = (new Client\Company($company['id']))->getCompany();
        }

        Company::upsert($companies, 'id');
        $movie->companies()->sync(array_unique(array_column($companies, 'id')));

        // Collection

        if ($movieScraper->data['belongs_to_collection'] !== null) {
            usleep(500000);
            $collection = (new Client\Collection($movieScraper->data['belongs_to_collection']['id']))->getCollection();

            Collection::upsert($collection, 'id');
            $movie->collection()->sync([$collection['id']]);
        }

        // Recommendations

        Recommendation::upsert($movieScraper->getRecommendations(), ['recommendation_movie_id', 'movie_id']);
    }
}

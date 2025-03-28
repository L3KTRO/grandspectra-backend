<?php

declare(strict_types=1);

/**
 * NOTICE OF LICENSE.
 *
 * UNIT3D Community Edition is open-sourced software licensed under the GNU Affero General Public License v3.0
 * The details is bundled with this project in the file LICENSE.txt.
 *
 * @project    UNIT3D Community Edition
 *
 * @author     HDVinnie <hdinnovations@protonmail.com>
 * @license    https://www.gnu.org/licenses/agpl-3.0.en.html/ GNU Affero General Public License v3.0
 */

namespace App\Jobs;

use App\Models\Company;
use App\Models\Credit;
use App\Models\Episode;
use App\Models\Genre;
use App\Models\Network;
use App\Models\Person;
use App\Models\Recommendation;
use App\Models\Season;
use App\Models\Tv;
use App\Services\Tmdb\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessTvJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

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
        // Tv

        $tvScraper = new Client\TV($this->id);

        $tv = Tv::updateOrCreate(['id' => $this->id], $tvScraper->getTv());

        // Genres

        Genre::upsert($tvScraper->getGenres(), 'id');
        $tv->genres()->sync(array_unique(array_column($tvScraper->getGenres(), 'id')));

        // People

        $credits = $tvScraper->getCredits();
        $people = [];

        foreach (array_unique(array_column($credits, 'person_id')) as $person_id) {
            usleep(500000);
            $people[] = (new Client\Person($person_id))->getPerson();
        }

        Person::upsert($people, 'id');
        Credit::where('tv_id', '=', $this->id)->delete();
        Credit::upsert($credits, ['person_id', 'movie_id', 'tv_id', 'occupation_id', 'character']);

        // Companies

        $companies = [];

        foreach ($tvScraper->getCompanies() ?? [] as $company) {
            $companies[] = (new Client\Company($company['id']))->getCompany();
        }

        Company::upsert($companies, 'id');
        $tv->companies()->sync(array_unique(array_column($companies, 'id')));

        // Networks
        $networks = [];

        foreach ($tvScraper->getNetworks() ?? [] as $network) {
            $networks[] = (new Client\Network($network['id']))->getNetwork();
        }

        Network::upsert($networks, 'id');
        $tv->networks()->sync(array_unique(array_column($networks, 'id')));

        // Recommendations
        Recommendation::upsert($tvScraper->getRecommendations(), ['id', 'recommendation_tv_id']);
    }
}

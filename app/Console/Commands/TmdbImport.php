<?php

namespace App\Console\Commands;

use App\Models\Keyword;
use App\Models\Movie;
use App\Models\Person;
use App\Models\Company;
use App\Models\Collection;
use App\Models\Network;
use App\Models\Tv;
use App\Services\Tmdb\TMDBScraper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Sleep;

class TmdbImport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tmdb:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        ini_set('memory_limit', '1024M');

        $this->info("Iniciando la importación de datos de TMDB");

        $tmdbScraper = new TMDBScraper();

        $date = now();

        if ($date->hour < 11) {
            $date = $date->subDay();
        }

        $requiredFormatDate = $date->format('m_d_Y');

        // Definir la configuración de cada entidad con el "template" del nombre
        $entities = [
            'TV_Series' => [
                'file' => 'tv_series_ids_MM_DD_YYYY.json.gz',
                'model' => Tv::class,
            ],
            'Movies' => [
                'file' => 'movie_ids_MM_DD_YYYY.json.gz',
                'model' => Movie::class,
            ],
            /*            'People' => [
                            'file' => 'person_ids_MM_DD_YYYY.json.gz',
                            'model' => Person::class,
                        ],
                        'TmdbCollections' => [
                            'file' => 'collection_ids_MM_DD_YYYY.json.gz',
                            'model' => Collection::class,
                        ],
                        'Keywords' => [
                            'file' => 'keyword_ids_MM_DD_YYYY.json.gz',
                            'model' => Keyword::class,
                        ],
                        'Production_Companies' => [
                            'file' => 'production_company_ids_MM_DD_YYYY.json.gz',
                            'model' => Company::class,
                        ],
                        'TV_Networks' => [
                            'file' => 'tv_network_ids_MM_DD_YYYY.json.gz',
                            'model' => Network::class,
                        ],
            */
        ];

        // Ruta base de TMDB
        $basePath = '/p/exports';

        foreach ($entities as $entityName => $data) {
            // Reemplaza la fecha en el nombre del archivo
            $fileName = str_replace('MM_DD_YYYY', $requiredFormatDate, $data['file']);
            // Construir la URL completa
            $url = "https://files.tmdb.org{$basePath}/{$fileName}";
            $this->info("Procesando {$entityName}: descargando {$url}");

            $response = Http::get($url);

            if ($response->successful()) {
                // Descomprimir el contenido .gz
                $rawContent = $response->body();
                $content = gzdecode($rawContent);
                if (!$content) {
                    $this->error("Error descomprimiendo el archivo para {$entityName}");
                    continue;
                }

                $lines = collect(preg_split('/\r\n|\r|\n/', $content))->shuffle()->toArray();
                $count = 0;
                foreach ($lines as $line) {

                    $line = trim($line);
                    if (!empty($line)) {
                        if ($entityName === 'Movies') {
                            $data = json_decode($line, true);
                            if ($data['adult'] === true) {
                                $this->info("Adulto: {$data['id']}");
                                continue;
                            }
                            $this->info("Procesando {$entityName}: {$data['id']}");
                            $tmdbScraper->movie($data['id']);
                            $count++;
                        } elseif ($entityName === 'TV_Series') {
                            $data = json_decode($line, true);
                            $this->info("Procesando {$entityName}: {$data['id']}");
                            $tmdbScraper->tv($data['id']);
                            $count++;
                        }
                    }
                }
                $this->info("{$count} registros importados para {$entityName}");
            } else {
                $this->error("Error al descargar el archivo para {$entityName}");
            }
        }
        return 0;
    }
}

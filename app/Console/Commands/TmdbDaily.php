<?php

namespace App\Console\Commands;

use App\Jobs\ProcessMovieJob;
use App\Models\Movie;
use App\Models\Tv;
use App\Services\Tmdb\TMDBScraper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TmdbDaily extends Command
{

    protected $signature = 'tmdb:daily';
    protected $description = 'Update popular daily';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        ini_set('memory_limit', '-1');

        $tmdbScraper = new TMDBScraper();

        $date = now();

        if ($date->hour < 11) {
            $date = $date->subDay();
        }

        $requiredFormatDate = $date->format('m_d_Y');

        // Definir la configuración de cada entidad con el "template" del nombre
        $entities = [
            'Series' => [
                'file' => 'tv_series_ids_MM_DD_YYYY.json.gz',
                'model' => Tv::class,
            ],
            'Movies' => [
                'file' => 'movie_ids_MM_DD_YYYY.json.gz',
                'model' => Movie::class,
            ],
        ];
        // Ruta base de TMDB
        $basePath = '/p/exports';

        foreach ($entities as $entityName => $dataEntity) {
            // Reemplaza la fecha en el nombre del archivo
            $fileName = str_replace('MM_DD_YYYY', $requiredFormatDate, $dataEntity['file']);
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
                        $data = json_decode($line, true);
                        $this->info("Procesando {$entityName}: {$data['id']}");

                        if ($entityName === 'Movies') {
                            if ($data['adult'] === true) {
                                $this->info("Adulto: {$data['id']}");
                                continue;
                            }
                            $movie = Movie::find($data['id']);
                            if ($movie) {
                                $movie->update(['popularity' => $data['popularity']]);
                            } else {
                                $tmdbScraper->movie($data['id']);
                            }
                        } elseif ($entityName === 'Series') {
                            $tv = Tv::find($data['id']);
                            if ($tv) {
                                $tv->update(['popularity' => $data['popularity']]);
                            } else {
                                $tmdbScraper->tv($data['id']);
                            }
                        }

                        $count++;
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

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\Movie;
use App\Models\Person;
use App\Models\TmdbCollection;
use App\Models\TvSeries;
use App\Models\Keyword;
use App\Models\ProductionCompany;
use App\Models\TvNetwork;

class ImportTmdbExports extends Command
{
    protected $signature = 'tmdb:import-exports';
    protected $description = 'Descarga y procesa las exportaciones de TMDB para cada entidad';

    public function handle(): int
    {
        // Obtén la fecha de hoy en el formato "m_d_Y", por ejemplo "02_11_2025"
        $date = now()->format('m_d_Y');

        // Definir la configuración de cada entidad con el "template" del nombre
        $entities = [
            'Movies' => [
                'file' => 'movie_ids_MM_DD_YYYY.json.gz',
                'model' => Movie::class,
            ],
            'TV_Series' => [
                'file' => 'tv_series_ids_MM_DD_YYYY.json.gz',
                'model' => TvSeries::class,
            ],
            'People' => [
                'file' => 'person_ids_MM_DD_YYYY.json.gz',
                'model' => Person::class,
            ],
            'Collections' => [
                'file' => 'collection_ids_MM_DD_YYYY.json.gz',
                'model' => TmdbCollection::class,
            ],
            'Keywords' => [
                'file' => 'keyword_ids_MM_DD_YYYY.json.gz',
                'model' => Keyword::class,
            ],
            'Production_Companies' => [
                'file' => 'production_company_ids_MM_DD_YYYY.json.gz',
                'model' => ProductionCompany::class,
            ],
            'TV_Networks' => [
                'file' => 'tv_network_ids_MM_DD_YYYY.json.gz',
                'model' => TvNetwork::class,
            ],
        ];

        // Ruta base de TMDB
        $basePath = '/p/exports';

        foreach ($entities as $entityName => $data) {
            // Reemplaza la fecha en el nombre del archivo
            $fileName = str_replace('MM_DD_YYYY', $date, $data['file']);
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
                // Dividir por líneas (cada línea es un objeto JSON)
                $lines = preg_split('/\r\n|\r|\n/', $content);
                $count = 0;
                foreach ($lines as $line) {

                    $line = trim($line);
                    if (!empty($line)) {
                        $record = json_decode($line, true);
                        $this->info("{$record['id']} to {$data['model']}");
                        if ($record) {
                            // Inserta o actualiza el registro según el id
                            $data['model']::updateOrCreate(
                                ['id' => $record['id']],
                                $record
                            );
                            $count++;
                            if ($count >= 1000) {
                                break;
                            }
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

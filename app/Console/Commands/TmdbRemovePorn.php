<?php

namespace App\Console\Commands;

use App\Models\Movie;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TmdbRemovePorn extends Command
{
    protected $signature = 'tmdb:porn';
    protected $description = 'Elimina contenido para adultos de la base de datos usando los datasets de TMDB';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        ini_set('memory_limit', '-1');

        $date = now();

        // Si es antes de las 11 AM, usar el dataset del día anterior
        if ($date->hour < 11) {
            $date = $date->subDay();
        }

        $requiredFormatDate = $date->format('m_d_Y');

        // Solo necesitamos películas, ya que solo ellas tienen la propiedad 'adult'
        $fileName = "movie_ids_{$requiredFormatDate}.json.gz";
        $url = "https://files.tmdb.org/p/exports/{$fileName}";

        $this->info("Descargando dataset de películas: {$url}");

        try {
            $response = Http::get($url);

            if (!$response->successful()) {
                $this->error("Error al descargar el archivo: {$response->status()}");
                return 1;
            }

            // Descomprimir el contenido .gz
            $rawContent = $response->body();
            $content = gzdecode($rawContent);

            if (!$content) {
                $this->error("Error descomprimiendo el archivo");
                return 1;
            }

            $this->info("Archivo descargado y descomprimido correctamente");

            // Procesar el contenido línea por línea para evitar problemas de memoria
            $lines = preg_split('/\r\n|\r|\n/', $content);
            $adultIds = [];
            $totalProcessed = 0;
            $adultCount = 0;

            $this->info("Procesando " . count($lines) . " registros para identificar contenido para adultos...");
            $progressBar = $this->output->createProgressBar(count($lines));

            foreach ($lines as $line) {
                $line = trim($line);
                if (!empty($line)) {
                    $data = json_decode($line, true);
                    $totalProcessed++;

                    if (isset($data['adult']) && $data['adult'] === true) {
                        $adultIds[] = $data['id'];
                        $adultCount++;
                    }
                }
                $progressBar->advance();
            }

            $progressBar->finish();
            $this->newLine();

            $this->info("Procesamiento completado: {$totalProcessed} películas analizadas, {$adultCount} identificadas como contenido para adultos");

            if (empty($adultIds)) {
                $this->info("No se encontró contenido para adultos para eliminar");
                return 0;
            }

            // Eliminar películas para adultos de la base de datos
            $this->info("Buscando y eliminando películas para adultos de la base de datos...");

            // Procesar en lotes para evitar consultas demasiado grandes
            $chunks = array_chunk($adultIds, 100);
            $totalDeleted = 0;

            DB::beginTransaction();
            try {
                foreach ($chunks as $chunk) {
                    $found = Movie::whereIn('id', $chunk)->get();
                    $countFound = $found->count();

                    if ($countFound > 0) {
                        $this->info("Eliminando {$countFound} películas para adultos...");

                        foreach ($found as $movie) {
                            // Registrar la eliminación para auditoría
                            Log::info("Eliminando película para adultos: ID {$movie->id}, Título: {$movie->title}");

                            // Eliminar la película
                            $movie->delete();
                            $totalDeleted++;
                        }
                    }
                }

                DB::commit();
                $this->info("Proceso completado. Se eliminaron {$totalDeleted} películas para adultos de la base de datos.");

            } catch (\Exception $e) {
                DB::rollBack();
                $this->error("Error al eliminar películas: " . $e->getMessage());
                Log::error("Error en RemoveAdultContent: " . $e->getMessage(), [
                    'exception' => $e,
                ]);
                return 1;
            }

            return 0;

        } catch (\Exception $e) {
            $this->error("Error en el proceso: " . $e->getMessage());
            Log::error("Error en RemoveAdultContent: " . $e->getMessage(), [
                'exception' => $e,
            ]);
            return 1;
        }
    }
}

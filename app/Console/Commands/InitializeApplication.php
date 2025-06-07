<?php
// app/Console/Commands/InitializeApplication.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\PhpExecutableFinder;

class InitializeApplication extends Command
{
    protected $signature = 'app:initialize';
    protected $description = 'Initialize application with background data imports';

    public function handle(): int
    {
        $this->info('🚀 Inicializando aplicación...');

        // Comandos de inicialización rápidos
        $this->call('config:cache');
        $this->call('route:cache');
        $this->call('scout:sync-index-settings');
        $this->call('queue:clear', ['--queue' => 'scout', "connection" => "redis"]);

        // Ejecutar importaciones en segundo plano
        $this->runBackgroundImports();

        $this->info('✅ Aplicación inicializada. Importaciones ejecutándose en segundo plano.');

        return 0;
    }

    private function runBackgroundImports(): void
    {
        $imports = [
            ['App\Models\Movie', 'movies'],
            ['App\Models\Tv', 'tvshows'],
            ['App\Models\Person', 'people'],
        ];

        foreach ($imports as [$model, $logName]) {
            $this->runBackgroundProcess('scout:import', $model, $logName);
            $this->info("📦 Importación de {$model} iniciada en segundo plano");
        }
    }

    private function runBackgroundProcess($command, $argument, $logName): void
    {
        $phpBinaryFinder = new PhpExecutableFinder();
        $phpBinaryPath = $phpBinaryFinder->find();

        $process = new Process([
            $phpBinaryPath,
            base_path('artisan'),
            $command,
            $argument
        ]);

        // Configurar para ejecutar en segundo plano
        $process->setOptions(['create_new_console' => true]);

        // Redirigir salida a logs
        $logPath = storage_path("logs/import-{$logName}.log");
        $process->setInput(null);

        // Iniciar el proceso sin esperar
        $process->start();

        // Opcional: Guardar el PID para monitoreo posterior
        file_put_contents(
            storage_path("logs/import-{$logName}.pid"),
            $process->getPid()
        );
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class S3Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 's3:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'S3 Storage Test Command';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Storage::disk('s3')->put('test.txt', 'This is a test file for S3 storage.');
        Storage::disk('s3')->delete('test.txt');
        $this->info(Storage::disk('s3')->url('test.txt'));
    }
}

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
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = Storage::disk('s3')->put('avatars/test.txt', 'This is a test file for S3 storage.');
        Storage::disk('s3')->delete('avatars/test.txt');
        $this->info(Storage::disk('s3')->url('avatars/test.txt'));
    }
}

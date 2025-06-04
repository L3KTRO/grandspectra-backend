<?php

namespace App\Console\Commands;

use http\Client\Curl\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\URL;

class GeneralTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'simple:test';

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
        $user = \App\Models\User::find(41);

        $link = URL::signedRoute('verify', [
            'id' => $user->id,
        ]);

        $this->info($link);
    }
}

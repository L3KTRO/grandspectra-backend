<?php

namespace App\Services\Tmdb\Client;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

abstract class Client
{
    protected function createClient(): PendingRequest
    {
        usleep(50000);
        return Http::withOptions([
            'resolver' => [
                '8.8.8.8',      // Google DNS
                '208.67.222.222', // OpenDNS
                "8.8.4.4",
                "9.9.9.9"
            ],
            'timeout' => 30,
            'connect_timeout' => 15,
        ])->acceptJson();
    }
}

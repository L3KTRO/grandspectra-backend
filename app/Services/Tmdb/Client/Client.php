<?php

namespace App\Services\Tmdb\Client;

use App\Services\Tmdb\TMDB;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

abstract class Client
{
//

    protected function createClient(): PendingRequest
    {
        return Http::withOptions([
            'proxy' => config("tmdb.proxy"),
            'timeout' => 30,
            'connect_timeout' => 15,
        ])->acceptJson();
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\TmdbClient;
use Illuminate\Database\Eloquent\Model;

abstract class TmdbController extends Controller
{
    protected TmdbClient $tmdbClient;

    public function __construct()
    {
        $this->tmdbClient = new TmdbClient();
    }

    public function toColumnArray($array, $column): ?array
    {
        return (empty($array)) ? null : array_column($array, $column);
    }

}

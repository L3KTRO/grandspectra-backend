<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use MeiliSearch\Client;

class SearchAllController extends Controller
{
    public function search(Request $request): \Illuminate\Http\JsonResponse
    {
        $query = $request->input('search');
        if (!$query) {
            return response()->json(['error' => 'Missing query parameter'], 400);
        }

        $client = new Client(config('scout.meilisearch.host'), config('scout.meilisearch.key'));
        $indexes = $client->getIndexes();
        $allResults = [];

        foreach ($indexes as $index) {
            $indexName = $index->getUid();
            $searchResult = $client->index($indexName)->search($query, ["showRankingScore" => true])->toArray();
            if (isset($searchResult['hits'])) {
                foreach ($searchResult['hits'] as $hit) {
                    // Añade el índice de relevancia si existe
                    $hit['_rankingScore'] = $hit['_rankingScore'] ?? null;
                    $hit['_index'] = $indexName;
                    $allResults[] = $hit;
                }
            }
        }

        usort($allResults, function ($a, $b) {
            // Normaliza popularity suponiendo que el máximo es 10000, ajusta según tu caso real
            $maxPopularity = 10000;
            $aPopularityNorm = isset($a['popularity']) ? min((float)$a['popularity'] / $maxPopularity, 1) : 0;
            $bPopularityNorm = isset($b['popularity']) ? min((float)$b['popularity'] / $maxPopularity, 1) : 0;

            $aScore = 0.75 * ((float)($a['_rankingScore'] ?? 0)) + 0.25 * $aPopularityNorm;
            $bScore = 0.75 * ((float)($b['_rankingScore'] ?? 0)) + 0.25 * $bPopularityNorm;
            return $bScore <=> $aScore;
        });

        $allResults = array_slice($allResults, 0, 10);

        return response()->json($allResults);
    }

    public function onlyMedia(Request $request): \Illuminate\Http\JsonResponse
    {
        $query = $request->input('search');
        if (!$query) {
            return response()->json(['error' => 'Missing query parameter'], 400);
        }

        $client = new Client(config('scout.meilisearch.host'), config('scout.meilisearch.key'));
        $indexes = $client->getIndexes();
        $allResults = [];

        foreach ($indexes as $index) {
            $indexName = $index->getUid();
            Log::info($indexName);
            if ($indexName === 'people') {
                continue; // Omite el índice de personas
            }
            $searchResult = $client->index($indexName)->search($query, ["showRankingScore" => true])->toArray();
            if (isset($searchResult['hits'])) {
                foreach ($searchResult['hits'] as $hit) {
                    // Añade el índice de relevancia si existe
                    $hit['_rankingScore'] = $hit['_rankingScore'] ?? null;
                    $hit['_index'] = $indexName;
                    $allResults[] = $hit;
                }
            }
        }

        usort($allResults, function ($a, $b) {
            // Normaliza popularity suponiendo que el máximo es 10000, ajusta según tu caso real
            $maxPopularity = 10000;
            $aPopularityNorm = isset($a['popularity']) ? min((float)$a['popularity'] / $maxPopularity, 1) : 0;
            $bPopularityNorm = isset($b['popularity']) ? min((float)$b['popularity'] / $maxPopularity, 1) : 0;

            $aScore = 0.75 * ((float)($a['_rankingScore'] ?? 0)) + 0.25 * $aPopularityNorm;
            $bScore = 0.75 * ((float)($b['_rankingScore'] ?? 0)) + 0.25 * $bPopularityNorm;
            return $bScore <=> $aScore;
        });

        $allResults = array_slice($allResults, 0, 20);

        return response()->json($allResults);
    }
}


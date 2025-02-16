<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieRequest;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class MovieController extends TmdbController
{

    public function index(): JsonResponse
    {
        $movies = Movie::paginate(100);
        return response()->json($movies);
    }

    public function indexByPopularity(): JsonResponse
    {
        $movies = Movie::orderBy('popularity', 'desc')->paginate(10);
        $data = [];
        foreach ($movies as $movie) {
            $tmdb = $this->show($movie->id);
            $data[] = $tmdb->original;
        }
        $movies->data = $data;
        return response()->json($movies);
    }

    public function show($id): JsonResponse
    {
        $local = Movie::find($id);

        if (is_null($local) || is_null($local["runtime"]) || $local["updated_at"]->diffInHours() > 24) {
            try {
                $tmdb = $this->tmdbClient->getMovie($id);
            } catch (\Exception $e) {
                return response()->json(status: 404);
            }

            $toUpdate = [
                "original_title" => $tmdb["original_title"],
                "overview" => $tmdb["overview"],
                "popularity" => $tmdb["popularity"],
                "poster_path" => $tmdb["poster_path"],
                "backdrop_path" => $tmdb["backdrop_path"],
                "release_date" => $tmdb["release_date"] === "" ? null : $tmdb["release_date"],
                "runtime" => $tmdb["runtime"],
                "vote_average" => $tmdb["vote_average"],
                "vote_count" => $tmdb["vote_count"],
                "budget" => $tmdb["budget"],
                "revenue" => $tmdb["revenue"],
                "status" => $tmdb["status"],
                "tagline" => $tmdb["tagline"],
                "adult" => $tmdb["adult"],
                "original_language" => $tmdb["original_language"],
                "homepage" => strlen($tmdb["homepage"]) > 255 ? null : $tmdb["homepage"],
                "production_companies" => $this->toColumnArray($tmdb["production_companies"], "id"),
                "production_countries" => $this->toColumnArray($tmdb["production_countries"], "iso_3166_1"),
                "spoken_languages" => $this->toColumnArray($tmdb["spoken_languages"], "name"),
                "genres" => $this->toColumnArray($tmdb["genres"], "id"),
            ];

            $local = Movie::updateOrCreate(['id' => $id], $toUpdate);

        }
        return response()->json($local);
    }

    public function store(MovieRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['original_title'] = Str::limit($data['original_title'], 255);
        $movie = Movie::create($data);
        return response()->json($movie, 201);
    }

    public function update(MovieRequest $request, $id): JsonResponse
    {
        $movie = Movie::findOrFail($id);
        $data = $request->validated();
        if (isset($data['original_title'])) {
            $data['original_title'] = Str::limit($data['original_title'], 255);
        }
        $movie->update($data);
        return response()->json($movie);
    }

    public function destroy($id): JsonResponse
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();
        return response()->json(null, 204);
    }
}

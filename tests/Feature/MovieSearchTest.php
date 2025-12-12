<?php

use App\Models\Movie;
use function Pest\Laravel\getJson;

it('returns paginated movies using scout', function () {
    $response = getJson('/api/movies');

    $response->assertSuccessful()
        ->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'poster', 'release_date', 'popularity'],
            ],
            'links',
            'meta',
        ]);
});

it('searches movies by title using scout', function () {
    $response = getJson('/api/movies?search=inception');

    $response->assertSuccessful()
        ->assertJsonStructure([
            'data',
            'links',
            'meta',
        ]);
});

it('filters movies by genres', function () {
    $response = getJson('/api/movies?genres[]=Action&genres[]=Drama');

    $response->assertSuccessful()
        ->assertJsonStructure([
            'data',
            'links',
            'meta',
        ]);
});

it('sorts movies by popularity', function () {
    $response = getJson('/api/movies?sort_by=popularity&sort_dir=desc');

    $response->assertSuccessful()
        ->assertJsonStructure([
            'data',
            'links',
            'meta',
        ]);
});

it('filters movies by numeric ranges', function () {
    $response = getJson('/api/movies?popularity_gt=50&vote_average_gt=7');

    $response->assertSuccessful()
        ->assertJsonStructure([
            'data',
            'links',
            'meta',
        ]);
});

it('respects per_page parameter', function () {
    $response = getJson('/api/movies?per_page=20');

    $response->assertSuccessful()
        ->assertJsonPath('meta.per_page', 20);
});

it('combines search with filters and sorting', function () {
    $response = getJson('/api/movies?search=action&genres[]=Action&sort_by=vote_average&sort_dir=desc&popularity_gt=30');

    $response->assertSuccessful()
        ->assertJsonStructure([
            'data',
            'links',
            'meta',
        ]);
});

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;
use App\Models\Movie;

class MovieTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_movies()
    {
        Movie::factory()->count(3)->create();
        $response = $this->getJson('/api/movies');
        $response->assertStatus(200);
    }

    public function test_store_creates_movie()
    {
        $payload = [
            'id' => 1001,
            'original_title' => 'A Very Long Movie Title That Will Be Limited',
            'popularity' => 12.34
        ];
        $response = $this->postJson('/api/movies', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 1001]);
        $this->assertDatabaseHas('movies', ['id' => 1001]);
    }

    public function test_show_returns_movie()
    {
        $movie = Movie::factory()->create();
        $response = $this->getJson("/api/movies/{$movie->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $movie->id]);
    }

    public function test_update_modifies_movie()
    {
        $movie = Movie::factory()->create(['original_title' => 'Old Title']);
        $payload = ['original_title' => 'New Title'];
        $response = $this->putJson("/api/movies/{$movie->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['original_title' => 'New Title']);
        $this->assertDatabaseHas('movies', ['id' => $movie->id, 'original_title' => 'New Title']);
    }

    public function test_destroy_deletes_movie()
    {
        $movie = Movie::factory()->create();
        $response = $this->deleteJson("/api/movies/{$movie->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('movies', ['id' => $movie->id]);
    }
}

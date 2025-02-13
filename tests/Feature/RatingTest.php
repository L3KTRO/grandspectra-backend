<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Rating;
use App\Models\User;

class RatingTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_ratings()
    {
        Rating::factory()->count(3)->create();
        $response = $this->getJson('/api/ratings');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_rating()
    {
        // Creamos un usuario de referencia
        $user = User::factory()->create();
        $payload = [
            'user_id'       => $user->id,
            'tmdb_id'       => 1234,
            'qualification' => 8
        ];
        $response = $this->postJson('/api/ratings', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['user_id' => $user->id]);
        $this->assertDatabaseHas('ratings', ['user_id' => $user->id, 'tmdb_id' => 1234]);
    }

    public function test_show_returns_rating()
    {
        $rating = Rating::factory()->create();
        $response = $this->getJson("/api/ratings/{$rating->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $rating->id]);
    }

    public function test_update_modifies_rating()
    {
        $rating = Rating::factory()->create(['qualification' => 5]);
        $payload = ['qualification' => 9];
        $response = $this->putJson("/api/ratings/{$rating->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['qualification' => 9]);
        $this->assertDatabaseHas('ratings', ['id' => $rating->id, 'qualification' => 9]);
    }

    public function test_destroy_deletes_rating()
    {
        $rating = Rating::factory()->create();
        $response = $this->deleteJson("/api/ratings/{$rating->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('ratings', ['id' => $rating->id]);
    }
}

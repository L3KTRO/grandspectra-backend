<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\TmdbCollection;

class TmdbCollectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_collections()
    {
        TmdbCollection::factory()->count(3)->create();
        $response = $this->getJson('/api/tmdb-collections');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_collection()
    {
        $payload = [
            'id'   => 5001,
            'name' => 'Collection One'
        ];
        $response = $this->postJson('/api/tmdb-collections', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 5001]);
        $this->assertDatabaseHas('tmdb_collections', ['id' => 5001]);
    }

    public function test_show_returns_collection()
    {
        $collection = TmdbCollection::factory()->create();
        $response = $this->getJson("/api/tmdb-collections/{$collection->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $collection->id]);
    }

    public function test_update_modifies_collection()
    {
        $collection = TmdbCollection::factory()->create(['name' => 'Old Name']);
        $payload = ['name' => 'New Name'];
        $response = $this->putJson("/api/tmdb-collections/{$collection->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'New Name']);
        $this->assertDatabaseHas('tmdb_collections', ['id' => $collection->id, 'name' => 'New Name']);
    }

    public function test_destroy_deletes_collection()
    {
        $collection = TmdbCollection::factory()->create();
        $response = $this->deleteJson("/api/tmdb-collections/{$collection->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('tmdb_collections', ['id' => $collection->id]);
    }
}

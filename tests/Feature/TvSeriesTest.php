<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\TvSeries;

class TvSeriesTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_tvseries()
    {
        TvSeries::factory()->count(3)->create();
        $response = $this->getJson('/api/tv-series');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_tvseries()
    {
        $payload = [
            'id'            => 10001,
            'original_name' => 'A Great Series',
            'popularity'    => 15.5
        ];
        $response = $this->postJson('/api/tv-series', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 10001]);
        $this->assertDatabaseHas('tv_series', ['id' => 10001]);
    }

    public function test_show_returns_tvseries()
    {
        $tvSeries = TvSeries::factory()->create();
        $response = $this->getJson("/api/tv-series/{$tvSeries->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $tvSeries->id]);
    }

    public function test_update_modifies_tvseries()
    {
        $tvSeries = TvSeries::factory()->create(['original_name' => 'Old Name']);
        $payload = ['original_name' => 'New Name'];
        $response = $this->putJson("/api/tv-series/{$tvSeries->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['original_name' => 'New Name']);
        $this->assertDatabaseHas('tv_series', ['id' => $tvSeries->id, 'original_name' => 'New Name']);
    }

    public function test_destroy_deletes_tvseries()
    {
        $tvSeries = TvSeries::factory()->create();
        $response = $this->deleteJson("/api/tv-series/{$tvSeries->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('tv_series', ['id' => $tvSeries->id]);
    }
}

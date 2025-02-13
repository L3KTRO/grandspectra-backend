<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\TvNetwork;

class TvNetworkTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_tvnetworks()
    {
        TvNetwork::factory()->count(3)->create();
        $response = $this->getJson('/api/tv-networks');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_tvnetwork()
    {
        $payload = [
            'id'   => 13001,
            'name' => 'Network One'
        ];
        $response = $this->postJson('/api/tv-networks', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 13001]);
        $this->assertDatabaseHas('tv_networks', ['id' => 13001]);
    }

    public function test_show_returns_tvnetwork()
    {
        $network = TvNetwork::factory()->create();
        $response = $this->getJson("/api/tv-networks/{$network->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $network->id]);
    }

    public function test_update_modifies_tvnetwork()
    {
        $network = TvNetwork::factory()->create(['name' => 'Old Network']);
        $payload = ['name' => 'New Network'];
        $response = $this->putJson("/api/tv-networks/{$network->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'New Network']);
        $this->assertDatabaseHas('tv_networks', ['id' => $network->id, 'name' => 'New Network']);
    }

    public function test_destroy_deletes_tvnetwork()
    {
        $network = TvNetwork::factory()->create();
        $response = $this->deleteJson("/api/tv-networks/{$network->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('tv_networks', ['id' => $network->id]);
    }
}

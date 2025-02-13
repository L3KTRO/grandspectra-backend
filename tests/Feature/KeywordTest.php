<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Keyword;

class KeywordTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_keywords()
    {
        Keyword::factory()->count(3)->create();
        $response = $this->getJson('/api/keywords');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_keyword()
    {
        $payload = [
            'id'   => 16001,
            'name' => 'Action'
        ];
        $response = $this->postJson('/api/keywords', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 16001]);
        $this->assertDatabaseHas('keywords', ['id' => 16001]);
    }

    public function test_show_returns_keyword()
    {
        $keyword = Keyword::factory()->create();
        $response = $this->getJson("/api/keywords/{$keyword->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $keyword->id]);
    }

    public function test_update_modifies_keyword()
    {
        $keyword = Keyword::factory()->create(['name' => 'Old Name']);
        $payload = ['name' => 'New Name'];
        $response = $this->putJson("/api/keywords/{$keyword->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'New Name']);
        $this->assertDatabaseHas('keywords', ['id' => $keyword->id, 'name' => 'New Name']);
    }

    public function test_destroy_deletes_keyword()
    {
        $keyword = Keyword::factory()->create();
        $response = $this->deleteJson("/api/keywords/{$keyword->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('keywords', ['id' => $keyword->id]);
    }
}

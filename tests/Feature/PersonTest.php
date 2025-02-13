<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Person;

class PersonTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_persons()
    {
        Person::factory()->count(3)->create();
        $response = $this->getJson('/api/people');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_person()
    {
        $payload = [
            'id' => 101,
            'adult' => false,
            'name' => 'John Doe',
            'popularity' => 5.5
        ];
        $response = $this->postJson('/api/people', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 101, 'name' => 'John Doe']);
        $this->assertDatabaseHas('people', ['id' => 101]);
    }

    public function test_show_returns_person()
    {
        $person = Person::factory()->create();
        $response = $this->getJson("/api/people/{$person->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $person->id]);
    }

    public function test_update_modifies_person()
    {
        $person = Person::factory()->create(['name' => 'Old Name']);
        $payload = ['name' => 'New Name'];
        $response = $this->putJson("/api/people/{$person->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'New Name']);
        $this->assertDatabaseHas('people', ['id' => $person->id, 'name' => 'New Name']);
    }

    public function test_destroy_deletes_person()
    {
        $person = Person::factory()->create();
        $response = $this->deleteJson("/api/people/{$person->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('people', ['id' => $person->id]);
    }
}

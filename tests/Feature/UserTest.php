<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_users()
    {
        User::factory()->count(3)->create();
        $response = $this->getJson('/api/users');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_user()
    {
        $payload = [
            'email' => 'test@example.com',
            'nickname' => 'testuser',
            'password' => 'secret123'
        ];
        $response = $this->postJson('/api/users', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['email' => 'test@example.com']);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_show_returns_user()
    {
        $user = User::factory()->create();
        $response = $this->getJson("/api/users/{$user->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['email' => $user->email]);
    }

    public function test_update_modifies_user()
    {
        $user = User::factory()->create(['nickname' => 'oldnickname']);
        $payload = ['nickname' => 'newnickname'];
        $response = $this->putJson("/api/users/{$user->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['nickname' => 'newnickname']);
        $this->assertDatabaseHas('users', ['id' => $user->id, 'nickname' => 'newnickname']);
    }

    public function test_destroy_deletes_user()
    {
        $user = User::factory()->create();
        $response = $this->deleteJson("/api/users/{$user->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}

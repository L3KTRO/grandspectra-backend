<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\ProductionCompany;

class ProductionCompanyTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_companies()
    {
        ProductionCompany::factory()->count(3)->create();
        $response = $this->getJson('/api/production-companies');
        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_store_creates_company()
    {
        $payload = [
            'id'   => 8001,
            'name' => 'Company One'
        ];
        $response = $this->postJson('/api/production-companies', $payload);
        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 8001]);
        $this->assertDatabaseHas('production_companies', ['id' => 8001]);
    }

    public function test_show_returns_company()
    {
        $company = ProductionCompany::factory()->create();
        $response = $this->getJson("/api/production-companies/{$company->id}");
        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $company->id]);
    }

    public function test_update_modifies_company()
    {
        $company = ProductionCompany::factory()->create(['name' => 'Old Company']);
        $payload = ['name' => 'New Company'];
        $response = $this->putJson("/api/production-companies/{$company->id}", $payload);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'New Company']);
        $this->assertDatabaseHas('production_companies', ['id' => $company->id, 'name' => 'New Company']);
    }

    public function test_destroy_deletes_company()
    {
        $company = ProductionCompany::factory()->create();
        $response = $this->deleteJson("/api/production-companies/{$company->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('production_companies', ['id' => $company->id]);
    }
}

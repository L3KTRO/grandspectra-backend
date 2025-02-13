<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TmdbCollectionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->randomNumber(),
            'name' => $this->faker->sentence(2),
        ];
    }
}

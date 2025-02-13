<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MovieFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->randomNumber(),
            'original_title' => $this->faker->sentence(3),
            'popularity' => $this->faker->randomFloat(2, 0, 100),
        ];
    }
}

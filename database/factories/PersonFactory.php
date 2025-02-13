<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PersonFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->randomNumber(),
            'adult' => $this->faker->boolean(),
            'name' => $this->faker->name(),
            'popularity' => $this->faker->randomFloat(2, 0, 100),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TvNetworkFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->randomNumber(),
            'name' => $this->faker->company(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Crea un usuario relacionado automáticamente
            'tmdb_id' => $this->faker->randomNumber(),
            'qualification' => $this->faker->numberBetween(1, 10),
        ];
    }

}

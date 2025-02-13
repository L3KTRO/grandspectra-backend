<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'email' => $this->faker->unique()->safeEmail(),
            'nickname' => $this->faker->userName(),
            'password' => Hash::make('password'), // Contraseña por defecto para pruebas
        ];
    }
}

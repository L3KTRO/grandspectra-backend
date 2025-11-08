<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear un usuario administrador si no existe
        User::firstOrCreate(
            ['email' => 'admin@grandspectra.com'],
            [
                'name' => 'Administrador',
                'username' => 'admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]
        );

        echo "✓ Usuario administrador creado/actualizado\n";
        echo "  Email: admin@grandspectra.com\n";
        echo "  Password: password\n";
    }
}

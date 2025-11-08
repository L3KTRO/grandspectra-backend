<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create-user {--email= : Email del usuario} {--password= : Contraseña del usuario}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crear un nuevo usuario administrador';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Crear Usuario Administrador ===');
        $this->newLine();

        // Obtener datos del usuario
        $name = $this->ask('Nombre del usuario');
        $username = $this->ask('Username');
        $email = $this->option('email') ?? $this->ask('Email');
        $password = $this->option('password') ?? $this->secret('Contraseña');
        $passwordConfirmation = $this->option('password') ?? $this->secret('Confirmar contraseña');

        // Validar los datos
        $validator = Validator::make([
            'name' => $name,
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $passwordConfirmation,
        ], [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            $this->error('Errores de validación:');
            foreach ($validator->errors()->all() as $error) {
                $this->error('- ' . $error);
            }
            return 1;
        }

        // Crear el usuario
        try {
            $user = User::create([
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'password' => Hash::make($password),
                'is_admin' => true,
            ]);

            $this->newLine();
            $this->info('✓ Usuario administrador creado exitosamente!');
            $this->newLine();
            $this->table(
                ['Campo', 'Valor'],
                [
                    ['ID', $user->id],
                    ['Nombre', $user->name],
                    ['Username', $user->username],
                    ['Email', $user->email],
                    ['Es Admin', 'Sí'],
                ]
            );

            return 0;
        } catch (\Exception $e) {
            $this->error('Error al crear el usuario: ' . $e->getMessage());
            return 1;
        }
    }
}

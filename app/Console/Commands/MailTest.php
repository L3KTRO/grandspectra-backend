<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class MailTest extends Command
{
    protected $signature = 'test:email {email}';
    protected $description = 'Test email configuration';

    public function handle(): void
    {
        $email = $this->argument('email');

        try {
            Mail::send('verify', [], function ($message) use ($email) {
                $message->to($email)
                    ->subject('Verify your account');
            });

            $this->info('Email enviado correctamente a: ' . $email);
        } catch (\Exception $e) {
            $this->error('Error al enviar email: ' . $e->getMessage());

        }
    }
}

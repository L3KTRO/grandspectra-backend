<?php

namespace App\Console\Commands;

use App\Jobs\ProcessVerifyMail;
use App\Mail\VerifyMail;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class MailTest extends Command
{
    protected $signature = 'test:email {email}';
    protected $description = 'Test email configuration';

    public function handle(): void
    {
        $email = $this->argument('email');

        $user = User::where("email", $email)->first();
        if ($user) {
            $link = URL::signedRoute('verify', [
                'id' => $user->id,
            ]);
            Mail::to($user->email)->send(new VerifyMail($link));
        }
    }
}

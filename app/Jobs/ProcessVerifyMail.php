<?php

namespace App\Jobs;

use App\Mail\VerifyMail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class ProcessVerifyMail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $userId)
    {
        $this->onConnection('redis');
        $this->onQueue('mailing-hp');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $user = User::find($this->userId);
        if ($user) {
            $link = URL::temporarySignedRoute('verify', now()->addMinutes(30), [
                'id' => $user->id,
            ]);
            Mail::to($user->email)->send(new VerifyMail($link));
        }
    }
}

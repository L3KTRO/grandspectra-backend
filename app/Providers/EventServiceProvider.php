<?php

namespace App\Providers;

use App\Events\UserWasFollowed;
use App\Events\UserWasUnfollowed;
use App\Listeners\CreateNewFollowerNotification;
use App\Listeners\DeleteFollowerNotification;
use App\Models\ContentList;
use App\Observers\ContentListObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    // app/Providers/EventServiceProvider.php

    protected array $listen = [
        // Añade tus eventos y listeners aquí
        UserWasFollowed::class => [
            CreateNewFollowerNotification::class,
        ],

        UserWasUnfollowed::class => [
            DeleteFollowerNotification::class,
        ],
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        ContentList::observe(ContentListObserver::class);
    }
}

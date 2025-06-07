<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('horizon:snapshot')->everyFiveMinutes()->onOneServer();
Schedule::command('tmdb:daily')->dailyAt('13:00')->onOneServer();

<?php

namespace Tests\Unit;

use App\Jobs\ProcessTvJob;
use Tests\TestCase;


class ExampleTest extends TestCase
{

    public function test_that_true_is_true(): void
    {
        $job = new ProcessTvJob("1396");
        $job->manage();
        $this->assertTrue(true);
    }
}

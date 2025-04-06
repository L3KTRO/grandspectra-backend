<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("movies", function (Blueprint $table) {
            $table->decimal('vote_average', 10)->nullable()->change();
            $table->bigInteger("revenue")->nullable()->change();
            $table->bigInteger("budget")->nullable()->change();
            $table->smallInteger("runtime")->nullable()->change();
        });

        Schema::table("tv", function (Blueprint $table) {
            $table->decimal('vote_average', 10)->nullable()->change();
            $table->smallInteger("episode_run_time")->nullable()->change();
        });

        Schema::table("recommendations", function (Blueprint $table) {
            $table->decimal('vote_average', 10)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

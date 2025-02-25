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
        Schema::create('tv', function (Blueprint $table) {
            $table->id();
            $table->string('tmdb_id')->nullable();
            $table->string('imdb_id')->nullable();
            $table->string('tvdb_id')->nullable();
            $table->string('type')->nullable();
            $table->string('name');
            $table->string('name_sort');
            $table->text('overview');
            $table->integer('number_of_episodes')->nullable();
            $table->integer('count_existing_episodes')->nullable();
            $table->integer('count_total_episodes')->nullable();
            $table->integer('number_of_seasons')->nullable();
            $table->string('episode_run_time')->nullable();
            $table->date('first_air_date')->nullable();
            $table->string('status')->nullable();
            $table->string('homepage')->nullable();
            $table->boolean('in_production')->default(false);
            $table->date('last_air_date')->nullable();
            $table->string('next_episode_to_air')->nullable();
            $table->string('origin_country')->nullable();
            $table->string('original_language')->nullable();
            $table->string('original_name')->nullable();
            $table->decimal('popularity', 8, 3)->nullable();
            $table->string('backdrop')->nullable();
            $table->string('poster')->nullable();
            $table->decimal('vote_average', 3, 1)->nullable();
            $table->integer('vote_count')->nullable();
            $table->string('trailer')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tv');
    }
};

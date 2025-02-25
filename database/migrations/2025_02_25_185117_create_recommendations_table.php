<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('recommendations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('poster')->nullable();
            $table->decimal('vote_average', 3, 1)->nullable();
            $table->date('release_date')->nullable();
            $table->date('first_air_date')->nullable();
            $table->foreignId('source_movie_id')->nullable()->constrained('movies')->cascadeOnDelete();
            $table->foreignId('target_movie_id')->nullable()->constrained('movies')->cascadeOnDelete();
            $table->foreignId('source_tv_id')->nullable()->constrained('tv')->cascadeOnDelete();
            $table->foreignId('target_tv_id')->nullable()->constrained('tv')->cascadeOnDelete();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommendations');
    }
};

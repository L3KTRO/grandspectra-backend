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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('tmdb_id')->nullable();
            $table->string('imdb_id')->nullable();
            $table->string('title');
            $table->string('title_sort'); // Para ordenación case-insensitive
            $table->string('original_language', 2)->nullable();
            $table->boolean('adult')->default(false);
            $table->string('backdrop')->nullable();
            $table->decimal('budget', 15, 2)->nullable();
            $table->string('homepage')->nullable();
            $table->string('original_title')->nullable();
            $table->text('overview')->nullable();
            $table->decimal('popularity', 8, 3)->nullable();
            $table->string('poster')->nullable();
            $table->date('release_date')->nullable();
            $table->decimal('revenue', 15, 2)->nullable();
            $table->integer('runtime')->nullable();
            $table->string('status')->nullable();
            $table->string('tagline')->nullable();
            $table->decimal('vote_average', 3, 1)->nullable();
            $table->integer('vote_count')->default(0);
            $table->string('trailer')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};

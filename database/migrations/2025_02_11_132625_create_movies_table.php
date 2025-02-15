<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            // Usamos el id de TMDB como clave primaria
            $table->unsignedBigInteger('id')->primary();
            $table->string('original_title');
            $table->float('popularity');
            $table->string('original_language')->nullable();
            $table->text('overview')->nullable();
            $table->string('poster_path')->nullable();
            $table->json('production_companies')->nullable();
            $table->json('production_countries')->nullable();
            $table->date('release_date')->nullable();
            $table->integer('revenue')->nullable();
            $table->integer('runtime')->nullable();
            $table->json('spoken_languages')->nullable();
            $table->string('status')->nullable();
            $table->string('tagline')->nullable();
            $table->float('vote_average')->nullable();
            $table->integer('vote_count')->nullable();
            $table->boolean('adult')->default(false);
            $table->string('backdrop_path')->nullable();
            $table->integer('budget')->nullable();
            $table->json('genres')->nullable();
            $table->string('homepage')->nullable();
            $table->string('belongs_to_collection')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
}

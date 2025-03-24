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
        Schema::create('recommendations', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->string('title');
            $table->string('poster')->nullable();
            $table->string('vote_average')->nullable();
            $table->date('release_date')->nullable();
            $table->date('first_air_date')->nullable();
            $table->unsignedInteger('movie_id')->nullable();
            $table->unsignedInteger('recommendation_movie_id')->nullable();
            $table->unsignedInteger('tv_id')->nullable();
            $table->unsignedInteger('recommendation_tv_id')->nullable();

            // Índices y claves únicas
            $table->primary('id');
            $table->unique(['movie_id', 'recommendation_movie_id']);
            $table->unique(['tv_id', 'recommendation_tv_id']);

            $table->index('movie_id');
            $table->index('recommendation_movie_id');
            $table->index('tv_id');
            $table->index('recommendation_tv_id');

            // Claves foráneas
            $table->foreign('movie_id')
                ->references('id')
                ->on('movies')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('recommendation_movie_id')
                ->references('id')
                ->on('movies')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('tv_id')
                ->references('id')
                ->on('tv')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('recommendation_tv_id')
                ->references('id')
                ->on('tv')
                ->onDelete('cascade')
                ->onUpdate('cascade');
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

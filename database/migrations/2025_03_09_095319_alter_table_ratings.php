<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists("ratings");
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('qualification'); // 1-10
            $table->unsignedInteger('movie_id')->nullable();
            $table->unsignedInteger('tv_id')->nullable();
            $table->timestamps();

            // Claves foráneas
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('tv_id')->references('id')->on('tv')->onDelete('cascade');

            // Índices únicos compuestos (usuario + contenido)
            $table->unique(['user_id', 'movie_id']);
            $table->unique(['user_id', 'tv_id']);
        });

        DB::statement('
            ALTER TABLE ratings
            ADD CONSTRAINT chk_ratings_movie_tv_exclusivity
            CHECK (
                (movie_id IS NOT NULL AND tv_id IS NULL)
                OR
                (movie_id IS NULL AND tv_id IS NOT NULL)
            )
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};

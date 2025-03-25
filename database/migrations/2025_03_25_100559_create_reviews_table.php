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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->integer('qualification'); // 1-10
            $table->text('content')->nullable();
            $table->unsignedInteger('movie_id')->nullable();
            $table->unsignedInteger('tv_id')->nullable();

            // Claves foráneas
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete("restrict");
            $table->foreign('tv_id')->references('id')->on('tv')->onDelete('restrict');
        });

        DB::statement('
            ALTER TABLE reviews
            ADD CONSTRAINT chk_reviews_movie_tv_exclusivity
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
        Schema::dropIfExists('reviews');
    }
};

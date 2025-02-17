<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('title_basics', function (Blueprint $table) {
            $table->string('tconst', 512)->primary();
            $table->string('titleType', 512)->nullable();
            $table->string('primaryTitle', 512)->nullable();
            $table->string('originalTitle', 512)->nullable();
            $table->smallInteger('startYear')->nullable();
            $table->smallInteger('endYear')->nullable();
            $table->integer('runtimeMinutes')->nullable();
            $table->string('genres', 512)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('title_basics');
    }
};

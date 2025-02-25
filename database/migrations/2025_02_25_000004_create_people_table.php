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
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('imdb_id')->nullable()->unique();
            $table->string('known_for_department')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->decimal('popularity', 6, 3)->nullable();
            $table->string('profile')->nullable();
            $table->string('still')->nullable();
            $table->boolean('adult')->default(false);
            $table->json('also_known_as')->nullable();
            $table->text('biography')->nullable();
            $table->date('birthday')->nullable();
            $table->date('deathday')->nullable();
            $table->enum('gender', ['0', '1', '2', '3'])->nullable(); // 0: Unknown, 1: Female, 2: Male, 3: Non-binary
            $table->string('homepage')->nullable();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('people');
    }
};

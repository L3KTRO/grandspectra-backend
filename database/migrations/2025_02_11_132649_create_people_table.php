<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeopleTable extends Migration
{
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->boolean('adult');
            $table->string('name');
            $table->float('popularity');
            $table->string('profile_path')->nullable();
            $table->json('also_known_as')->nullable();
            $table->text('biography')->nullable();
            $table->date('birthday')->nullable();
            $table->date('deathday')->nullable();
            $table->string('known_for_department')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('homepage')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('people');
    }
}

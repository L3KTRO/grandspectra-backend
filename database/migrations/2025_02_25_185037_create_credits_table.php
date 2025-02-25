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

        Schema::create('credits', function (Blueprint $table) {

            $table->id();
            $table->foreignId('person_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('movie_id')->nullable()->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('tv_id')->nullable()->constrained("tv")->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('occupation_id');
            $table->integer('order')->nullable();
            $table->string('character')->nullable();
            $table->unique(['person_id', 'movie_id', 'tv_id', 'occupation_id', 'character']);
            $table->timestamps();

        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credits');
    }
};

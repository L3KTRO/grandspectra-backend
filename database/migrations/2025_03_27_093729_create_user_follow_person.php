<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('people_followers', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedInteger('person_id');

            $table->foreign('user_id')->references("id")->on("users")->onDelete('cascade');
            $table->foreign('person_id')->references("id")->on("people")->onDelete('cascade');
            $table->timestamps();

            $table->primary(['user_id', 'person_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('people_followers');
    }
};

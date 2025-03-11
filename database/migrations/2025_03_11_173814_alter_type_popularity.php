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
        Schema::table('movies', function (Blueprint $table) {
            $table->decimal('popularity', 10, 2)->nullable()->change();
        });

        Schema::table('tv', function (Blueprint $table) {
            $table->decimal('popularity', 10, 2)->nullable()->change();
        });

        Schema::table('people', function (Blueprint $table) {
            $table->decimal('popularity', 10, 2)->nullable()->change();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

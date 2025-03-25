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
            $table->text('overview')->nullable()->change();
            $table->text('homepage')->nullable()->change();
        });

        Schema::table('tv', function (Blueprint $table) {
            $table->text('overview')->nullable()->change();
            $table->text('homepage')->nullable()->change();
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->text('description')->nullable()->change();
        });

        Schema::table('networks', function (Blueprint $table) {
            $table->text('description')->nullable()->change();
        });

        Schema::table('people', function (Blueprint $table) {
            $table->text('biography')->nullable()->change();
            $table->text('homepage')->nullable()->change();
            $table->text('also_known_as')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->mediumText('overview')->nullable()->change();
            $table->mediumText('homepage')->nullable()->change();
        });

        Schema::table('tv', function (Blueprint $table) {
            $table->mediumText('overview')->nullable()->change();
            $table->mediumText('homepage')->nullable()->change();
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->mediumText('description')->nullable()->change();
        });

        Schema::table('networks', function (Blueprint $table) {
            $table->mediumText('description')->nullable()->change();
        });

        Schema::table('people', function (Blueprint $table) {
            $table->mediumText('biography')->nullable()->change();
            $table->mediumText('homepage')->nullable()->change();
            $table->mediumText('also_known_as')->nullable()->change();
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductionCompaniesTable extends Migration
{
    public function up(): void
    {
        Schema::create('production_companies', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->string('name');
            $table->string('logo_path')->nullable();
            $table->string('origin_country')->nullable();
            $table->string('homepage')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('production_companies');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTvSeriesTable extends Migration
{
    public function up(): void
    {
        Schema::create('tv_series', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->string('original_name');
            $table->float('popularity');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tv_series');
    }
}

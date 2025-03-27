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
        Schema::create('content_lists', function (Blueprint $table) {
            $table->unsignedInteger("id")->autoIncrement()->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('user_id')->constrained("users", "id")->onDelete('cascade');
            $table->boolean('public')->default(true);
            $table->timestamps();
        });

        Schema::create("content_list_movie", function (Blueprint $table) {
            $table->unsignedInteger("content_list_id");
            $table->unsignedInteger("movie_id");
            $table->timestamps();

            // Foreign keys
            $table->foreign("content_list_id")->references("id")->on("content_lists")->onDelete("cascade");
            $table->foreign("movie_id")->references("id")->on("movies")->onDelete("cascade");

            // Composite primary key
            $table->primary(["content_list_id", "movie_id"]);
        });

        Schema::create("content_list_tv", function (Blueprint $table) {
            $table->unsignedInteger("content_list_id");
            $table->unsignedInteger("tv_id");
            $table->timestamps();

            // Foreign keys
            $table->foreign("content_list_id")->references("id")->on("content_lists")->onDelete("cascade");
            $table->foreign("tv_id")->references("id")->on("tv")->onDelete("cascade");

            // Composite primary key
            $table->primary(["content_list_id", "tv_id"]);
        });

        Schema::create("content_list_votes", function (Blueprint $table) {
            $table->unsignedInteger("content_list_id");
            $table->unsignedBigInteger("user_id");
            $table->boolean("vote")->default(true);
            $table->timestamps();

            // Foreign keys
            $table->foreign("content_list_id")->references("id")->on("content_lists")->onDelete("cascade");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");

            // Composite primary key
            $table->primary(["content_list_id", "user_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_list');
        Schema::dropIfExists('content_list_movie');
        Schema::dropIfExists('content_list_tv');
        Schema::dropIfExists('content_list_votes');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create('app_users', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();  // Name is optional at creation
            $table->string('email')->nullable()->unique();
            $table->string('phone_number')->nullable()->unique();

            $table->string('image')->nullable();  // Profile image URL or path
            $table->date('birthday')->nullable();

            $table->string('preferred_makes')->nullable();  // e.g. ["Toyota", "Honda"]
            $table->string('preferred_types')->nullable();  // e.g. ["SUV", "Sedan"]

            $table->string('city')->nullable();

            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('authorized')->default(false);
            $table->rememberToken();  // for optional session persistence
            $table->timestamps();
            $table->time('last_login');
            $table->string('type')->default('normal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('app_users');
    }
};

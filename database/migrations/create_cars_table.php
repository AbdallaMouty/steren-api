<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('seller_id')->nullable();
            $table->string('make');
            $table->string('model');
            $table->integer('year');
            $table->string('color');
            $table->bigInteger('price');
            $table->timestamps();
            $table->softDeletes();  // adds deleted_at
            $table->boolean('deleted')->default(false);
            $table->string('body_type')->nullable();
            $table->string('wakeel')->nullable();
            $table->string('wakeel_icon')->nullable();
            $table->json('images')->nullable();
            $table->string('status')->default('pending');
            $table->boolean('promoted')->default(false);
            $table->string('plan')->nullable();
            $table->string('condition')->nullable();
            $table->uuid('owner_id')->nullable();
            $table->string('fuel')->nullable();
            $table->string('drive')->nullable();
            $table->bigInteger('gear')->nullable();
            $table->bigInteger('seats')->nullable();
            $table->string('engine')->nullable();
            $table->string('region')->nullable();
            $table->string('vin')->nullable();
            $table->string('seller_type')->nullable();
            $table->string('cylinders')->nullable();
            $table->string('gcc')->nullable();
            $table->integer('km')->nullable();
            $table->text('features')->nullable();
            $table->boolean('inspected')->default(false);
            $table->text('inspection_report')->nullable();
            $table->text('damage_report')->nullable();
            $table->text('carfax_report')->nullable();
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->boolean('warranted')->default(false);
            $table->boolean('studio')->default(false);
            $table->uuid('studio_id')->nullable();
            $table->uuid('package_id')->nullable();
            $table->string('trim')->nullable();
            $table->text('rejection_reason')->nullable()->default('');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};

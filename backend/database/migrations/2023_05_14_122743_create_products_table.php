<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('crop_id');
            $table->unsignedBigInteger('farm_id');
            $table->string('product_name');
            $table->dateTime('harvest_date');
            $table->integer('quantity')->default(0);
            $table->string('status');
            $table->foreign('crop_id')
                ->references('id')
                ->on('crops')
                ->onDelete('cascade');
            $table->foreign('farm_id')
                ->references('id')
                ->on('farms')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};

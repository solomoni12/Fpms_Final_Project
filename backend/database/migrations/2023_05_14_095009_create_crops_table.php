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
        Schema::create('crops', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('farm_id');
            $table->string('crop_name');
            $table->dateTime('planting_date');
            $table->dateTime('harvest_date');
            $table->integer('expected_product')->default(0);
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
        Schema::dropIfExists('crops');
    }
};

<?php

namespace App\Models;

use App\Models\Farm;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Crop extends Model
{
    use HasFactory;

    protected $fillable = [
        'farm_id',
        'crop_name',
        'planting_date',
        'harvest_date',
        'expected_product',
    ];

    public function farms(){
        return $this->belongsTo(Farm::class);
    }

    public function farm()
{
    return $this->belongsTo(Farm::class);
}



}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'crop_id',
        'farm_id',
        'product_name',
        'harvest_date',
        'quantity',
        'status',
    ];

    public function crops(){
        return $this->belongsTo(Crop::class);
    }

    public function farm(){
        return $this->belongsTo(Farm::class);
    }
}

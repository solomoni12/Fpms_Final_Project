<?php

namespace App\Models;

use App\Models\Farm;
use App\Models\Input;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OwnerInput extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'input_id',
        'farm_id',
        'price',
        'quantity',
    ];

    public function input(){
        return $this->belongsTo(Input::class);
    }
    
    public function farm(){
        return $this->belongsTo(Farm::class);
    }
}

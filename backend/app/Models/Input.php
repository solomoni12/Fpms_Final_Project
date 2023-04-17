<?php

namespace App\Models;

use App\Models\Equipment;
use App\Models\OwnerInput;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Input extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
    ];

    public function inputOwners(){
        return $this->hasMany(OwnerInput::class);
    }

    public function equipments(){
        return $this->hasMany(Equipment::class);
    }
}

<?php

namespace App\Models;

use App\Models\User;
use App\Models\OwnerInput;
use App\Models\FarmAssigment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Farm extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'name',
        'size',
        'location',
        'land_title',
    ];

    protected $casts = [
        'size' => 'float',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function farmAssigment(){
        return $this->hasMany(FarmAssigment::class);
    }
    
    public function ownerInput(){
        return $this->hasMany(OwnerInput::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Farmer extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'owned_land_size',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function equipment(){
        return $this->hasMany(Equipment::class);
    }

    public function worker(){
        return $this->hasMany(Worker::class);
    }

    public function farm(){
        return $this->hasMany(Farm::class);
    }
}

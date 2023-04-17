<?php

namespace App\Models;

use App\Models\FarmAssigment;
use App\Models\WorkerReferee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Worker extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'fname',
        'mname',
        'lname',
        'sex',
        'phone_number',
        'physical_address',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function workerReferee(){
        return $this->hasMany(WorkerReferee::class);
    }

    public function farmAssigment(){
        return $this->hasMany(FarmAssigment::class);
    }
}

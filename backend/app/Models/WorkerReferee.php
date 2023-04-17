<?php

namespace App\Models;

use App\Models\Worker;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WorkerReferee extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'worker_id',
        'fname',
        'lname',
        'phone_number',
        'physical_address',
    ];

    public function worker(){
        return $this->belongsTo(Worker::class);
    }
}

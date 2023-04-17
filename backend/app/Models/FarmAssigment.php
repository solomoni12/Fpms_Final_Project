<?php

namespace App\Models;

use App\Models\Farm;
use App\Models\Worker;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FarmAssigment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'worker_id',
        'farm_id',
        'task_name',
        'status',
        'time_start',
        'time_assigned',
        'time_complished',
    ];

    public function worker(){
        return $this->belongsTo(Worker::class);
    }

    public function farm(){
        return $this->belongsTo(Farm::class);
    }
}

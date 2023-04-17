<?php

namespace App\Models;

use App\Models\Input;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Equipment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'input_id',
        'quantity',
       
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function input(){
        return $this->belongsTo(Input::class);
    }
}

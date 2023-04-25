<?php

namespace App\Http\Resources;

use App\Http\Resources\WorkerRefereeResource;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fname'=>$this->fname,
            'mname'=>$this->mname,
            'lname'=> $this->lname,
            'sex' => $this->sex,
            'phone_number'=>$this->phone_number,
            'physical_address'=>$this->physical_address,
            'workerReferee' => $this->workerReferee,
            'relationships'=>[
                'id' => (string)$this->user->id,
                'user name' => $this->user->lname,
                'user email'=> $this->user->email
            ],
        ];
    }
}

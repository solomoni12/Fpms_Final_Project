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
            'lname'=> $this->lname,
            'workerReferee' => $this->workerReferee,
            'relationships'=>[
                'id' => (string)$this->user->id,
                'user name' => $this->user->lname,
                'user email'=> $this->user->email
            ],
        ];
    }
}

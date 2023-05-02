<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkerRefereeResource extends JsonResource
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
            'fname' => $this->fname,
            'lname' => $this->lname,
            'phone_number'=>$this->phone_number,
            'physical_address'=>$this->physical_address,
            'worker' => [
                'id' => $this->worker->id,
                'name' => $this->worker->lname,
                // add more fields as needed
            ],
            // add more fields as needed
        ];
    }
}

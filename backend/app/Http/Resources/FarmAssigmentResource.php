<?php

namespace App\Http\Resources;

use App\Http\Resources\FarmResource;
use App\Http\Resources\WorkerResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FarmAssigmentResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'time_assigned' => $this->time_assigned,
            'time_complished' => $this->time_complished,
            'farm' => new FarmResource($this->farm),
            'worker' => new WorkerResource($this->worker),
        ];
    }
}

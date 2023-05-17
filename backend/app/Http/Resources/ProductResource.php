<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'product_name' => $this->product_name,
            'harvest_date' => $this->harvest_date,
            'quantity' => $this->quantity,
            'status' => $this->status,
            // 'time_complished' => $this->time_complished,
            // 'farm' => new FarmResource($this->farm),
            // 'worker' => new WorkerResource($this->worker),
        ];
    }
}

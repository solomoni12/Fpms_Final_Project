<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CropResource extends JsonResource
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
            'crop_name' => $this->crop_name,
            'planting_date' => $this->planting_date,
            'harvest_date' => $this->harvest_date,
            'expected_product' => $this->expected_product,
            // 'farm' => new FarmResource($this->farm),
            // 'worker' => new WorkerResource($this->worker),
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\FarmResource;
use App\Http\Resources\InputResource;
use Illuminate\Http\Resources\Json\JsonResource;

class OwnerInputResource extends JsonResource
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
            'farm_id' => $this->farm_id,
            'input_id' => $this->input_id,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'farm' => new FarmResource($this->farm),
            'input' => new InputResource($this->input),

        ];
    }
}

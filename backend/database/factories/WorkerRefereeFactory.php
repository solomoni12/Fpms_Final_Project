<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkerReferee>
 */
class WorkerRefereeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // 'farmer_id' => auth()->user()->id,
            'fname' => $this->fake()->fname(),
            'lname' => $this->fake()->lname(),
            'phyisical_address' => $this->fake()->phyisical_address(),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Worker>
 */
class WorkerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => auth()->user()->id,
            'fname' => $this->fake()->fname(),
            'mname' => $this->fake()->mname(),
            'lname' => $this->fake()->lname(),
            'sex' => $this->fake->sex(),
            'phone_number' => $this->fake()->phone_number(),
            'physical_address' => $this->fake()->phone_number(),
        ];
    }
}

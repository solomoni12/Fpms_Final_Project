<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Farm>
 */
class FarmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => Auth::farmer()->id,
            'name' => $this->faker->unique()->setence(),
            'land_title'=> $this->faker->unique()->text(),
            'location' => $this->faker->text(),
            'size' => $this->faker->text()
        ];
    }
}

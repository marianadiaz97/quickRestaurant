<?php

namespace Database\Factories;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Restaurant::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            //'owner_id', => This assigned manually
            'qr_code' => $this->faker->lexify('????????'),
            'name' => $this->faker->name,
            'address' => $this->faker->address,
            'phone' => $this->faker->numerify('3##########'),
            'image_url' => $this->faker->image(null, 360, 360, 'restaurants', true),
        ];
    }
}

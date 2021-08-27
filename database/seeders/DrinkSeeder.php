<?php

namespace Database\Seeders;

use App\Models\Drink;
use App\Models\Restaurant;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DrinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $restaurants = Restaurant::all();

        foreach ($restaurants as $restaurant) {
            Drink::create([
                'name' => 'Limonada',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'of_the_day' => true
            ]);

            Drink::create([
                'name' => 'Avena',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
            ]);

            Drink::create([
                'name' => 'Jugo de Melon',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
            ]);
        }
    }
}

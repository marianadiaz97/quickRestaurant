<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Dish;
use App\Models\Restaurant;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DishSeeder extends Seeder
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
        $categories = Category::all()->pluck('id');

        foreach ($restaurants as $restaurant) {
            Dish::create([
                'name' => 'Bandeja Paisa',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Sancocho',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Changua',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Arepas',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Lomo de Cerdo',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Pechuga a la Plancha',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Caldo de costilla',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Patacones',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Hamburguesa',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);

            Dish::create([
                'name' => 'Salchipapa',
                'restaurant_id' => $restaurant->id,
                'price' => $faker->randomNumber(4),
                'category_id' => $faker->randomElement($categories)
            ]);
        }
    }
}

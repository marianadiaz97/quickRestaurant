<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $restaurants = Restaurant::all();
        foreach ($restaurants as $restaurant) {
            Product::create([
                'name' => 'cerdo',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'arroz',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'yuka',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'frijoles',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'maduro',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'pasta',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'pechuga',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'pernil',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'alas de pollo',
                'restaurant_id' => $restaurant->id,
                'has_additional_price' => true,
                'price' => 2500.00
            ]);

            Product::create([
                'name' => 'huevo',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'chorizo',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'papa',
                'restaurant_id' => $restaurant->id,
            ]);

            Product::create([
                'name' => 'vegetales',
                'restaurant_id' => $restaurant->id,
            ]);
        }
    }
}

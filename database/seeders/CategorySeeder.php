<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
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
            Category::factory()->create([
                'name' => 'Almuerzo Ejecutivo',
                'restaurant_id' => $restaurant->id,
            ]);

            Category::factory()->create([
                'name' => 'Desayuno',
                'restaurant_id' => $restaurant->id,
            ]);

            Category::factory()->create([
                'name' => 'Comida Rapida',
                'restaurant_id' => $restaurant->id,
            ]);
        }
    }
}

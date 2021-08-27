<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(RestaurantSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(DishSeeder::class);
        $this->call(DrinkSeeder::class);
        $this->call(OrderSeeder::class);
    }
}
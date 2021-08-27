<?php

namespace Database\Seeders;

use App\Models\Dish;
use App\Models\Drink;
use App\Models\Order;
use App\Models\OrderDetail;
use Faker\Factory;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        $dishes = Dish::all()->take(3);
        $drink = Drink::where('of_the_day', true)->first();

        $order = Order::create([
            'user_id' => 1,
            'restaurant_id' => 1,
            'payment_method' => $faker->creditCardType,
            'status' => $faker->randomElement(['Pendiente', 'Progreso', 'Despachado']),
            'comment' => $faker->text(200),
            'total' => $dishes->sum('price') + ($drink->price * 3)
        ]);

        foreach ($dishes as $dish) {
            OrderDetail::create([
                'order_id' => $order->id,
                'dish_id' => $dish->id,
                'dish_name' => $dish->name,
                'quantity' => 1,
                'price' => $dish->price,
                'drink_id' => $drink->id,
                'drink_price' => $drink->price,
                'drink_name' => $drink->name,
            ]);
        }

    }
}

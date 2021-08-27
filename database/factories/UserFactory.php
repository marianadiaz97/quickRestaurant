<?php

namespace Database\Factories;

use App\Models\User;
use Closure;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $firstName = $this->faker->name;
        $lastName = $this->faker->lastName;
        $name = implode(' ', [$firstName, $lastName]);
        $phone = $this->faker->numerify('3##########');

        return [
            'first_name' =>$firstName,
            'last_name' => $lastName,
            'name' => $name,
            'phone' => $phone,
            'email' => $this->faker->unique()->safeEmail,
            'password' =>  Hash::make($phone),
            'remember_token' => Str::random(10),
        ];
    }


    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): UserFactory
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('client');
        });
    }
}

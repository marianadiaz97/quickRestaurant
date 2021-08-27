<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**@var User $admin*/
        $admin = User::factory()->create([
            'email' => 'afelipebravoh@hotmail.com',
            'phone' => '3108086921',
            'email_verified_at' => now(),
            'password' =>  Hash::make('3108086921')
        ]);

        $admin->syncRoles('admin');

        User::factory(10)->create();
    }
}

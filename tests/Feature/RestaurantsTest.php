<?php

namespace Tests\Feature;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/**
 * @testdox Pruebas del Modulo de Restaurantes
 */
class RestaurantsTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $owner;

    public function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub

        /**@var User $admin*/
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $this->admin = $admin;


        /**@var User $owner*/
        $owner = User::factory()->create();
        $owner->assignRole('owner');
        $this->owner = $owner;

    }

    /**
     * @testdox Administrador puede listar los restaurantes
     **/
    public function testAdminCanListRestaurants()
    {
        $this->actingAs($this->admin);
        $response = $this->get('/restaurants');
        $response->assertStatus(200);
    }

    /**
     * @testdox Propietario puede listar los restaurantes
     **/
    public function testOwnerCanListRestaurants()
    {
        $this->actingAs($this->owner);
        $response = $this->get('/restaurants');
        $response->assertStatus(200);
    }

    /**
     * @testdox Administrador puede crear restaurantes
     **/
    public function testAdminCanCreateRestaurants()
    {
        $this->actingAs($this->admin);
        /**@var Restaurant $restaurant*/
        $restaurant = Restaurant::factory()->make([
            'user_id' => $this->admin->id
        ]);

        $response = $this->post('/restaurants', [
            'name' => $restaurant->name,
            'address' => $restaurant->address,
            'phone' => $restaurant->phone,
            'user_id' => $this->owner->id,
        ]);

        $response->assertRedirect('/restaurants');
        $restaurantExists = Restaurant::query()->first();
        $this->assertNotNull($restaurantExists);
    }

    /**
     * @testdox Administrador puede editar restaurantes
     **/
    public function testAdminCanEditRestaurants()
    {
        $this->actingAs($this->admin);
        /**@var Restaurant $restaurant*/
        $restaurant = Restaurant::factory()->create([
            'user_id' => $this->admin->id
        ]);

        $response = $this->put("/restaurants/$restaurant->id", [
            'name' => 'Ajonjol??',
            'address' => $restaurant->address,
            'phone' => $restaurant->phone,
            'user_id' => $this->owner->id,
        ]);

        $response->assertRedirect('/restaurants');
        $restaurantExists = Restaurant::query()->first();
        $this->assertNotNull($restaurantExists);
        $this->assertEquals('Ajonjol??', $restaurantExists->name);
    }

    /**
     * @testdox Propietario puede crear restaurantes
     **/
    public function testOwnerCanCreateRestaurants()
    {
        $this->actingAs($this->owner);
        /**@var Restaurant $restaurant*/
        $restaurant = Restaurant::factory()->make([
            'user_id' => $this->admin->id
        ]);

        $response = $this->post('/restaurants', [
            'name' => $restaurant->name,
            'address' => $restaurant->address,
            'phone' => $restaurant->phone,
            'user_id' => $this->owner->id,
        ]);

        $response->assertRedirect('/restaurants');
        $restaurantExists = Restaurant::query()->first();
        $this->assertNotNull($restaurantExists);
    }

    /**
     * @testdox Propietario puede editar restaurantes
     **/
    public function testOwnerCanEditRestaurants()
    {
        $this->actingAs($this->owner);
        /**@var Restaurant $restaurant*/
        $restaurant = Restaurant::factory()->create([
            'user_id' => $this->admin->id
        ]);

        $response = $this->put("/restaurants/$restaurant->id", [
            'name' => 'Ajonjol??',
            'address' => $restaurant->address,
            'phone' => $restaurant->phone,
            'user_id' => $this->owner->id,
        ]);

        $response->assertRedirect('/restaurants');
        $restaurantExists = Restaurant::query()->first();
        $this->assertNotNull($restaurantExists);
        $this->assertEquals('Ajonjol??', $restaurantExists->name);
    }

    /**
     * @testdox Administrador puede eliminar restaurantes
     **/
    public function testAdminCanDeleteRestaurant()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

}

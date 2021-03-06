<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/**
 * @testdox Pruebas del Modulo de Productos
 */
class ProductsTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    protected $restaurant;
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

        /**@var Restaurant $restaurant*/
        $restaurant = Restaurant::factory()->create([
            'user_id' => $this->owner->id
        ]);
        $this->restaurant = $restaurant;

    }

    /**
     * @testdox Administrador puede listar los productos de restaurantes
     **/
    public function testAdminCanListProducts()
    {
        $this->actingAs($this->admin);
        $restaurant = $this->restaurant;
        $response = $this->get("/restaurants/$restaurant->id/products");
        $response->assertStatus(200);
    }

    /**
     * @testdox Propietario puede listar los productos de restaurante
     **/
    public function testOwnerCanListProducts()
    {
        $this->actingAs($this->owner);
        $restaurant = $this->restaurant;
        $response = $this->get("/restaurants/$restaurant->id/products");
        $response->assertStatus(200);
    }

    /**
     * @testdox Administrador puede crear productos
     **/
    public function testAdminCanCreateProducts()
    {
        $this->actingAs($this->admin);
        $restaurant = $this->restaurant;

        $response = $this->post("/restaurants/$restaurant->id/products/create", [
            'restaurant_id' => $restaurant->id,
            'name' => $this->faker->name,
            'price' => 0,
            'has_additional_price' => false
        ]);

        $response->assertRedirect("/restaurants/$restaurant->id/products");
        $product = Product::query()->first();
        $this->assertNotNull($product);
    }


    /**
     * @testdox Propietario puede crear productos
     **/
    public function testOwnerCanCreateProducts()
    {
        $this->actingAs($this->owner);
        $restaurant = $this->restaurant;

        $response = $this->post("/restaurants/$restaurant->id/products/create", [
            'restaurant_id' => $restaurant->id,
            'name' => $this->faker->name,
            'price' => 0,
            'has_additional_price' => false
        ]);

        $response->assertRedirect("/restaurants/$restaurant->id/products");
        $product = Product::query()->first();
        $this->assertNotNull($product);
    }

    /**
     * @testdox Administrador puede editar productos
     **/
    public function testAdminCanEditProduct()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * @testdox Propietario puede editar productos
     **/
    public function testOwnerCanEditProduct()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * @testdox Administrador puede borrar productos
     **/
    public function testAdminCanDeleteProduct()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * @testdox Propietario puede borrar productos
     **/
    public function testOwnerCanDeleteProduct()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }




}

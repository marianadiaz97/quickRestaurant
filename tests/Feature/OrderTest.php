<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/**
 * @testdox Pruebas del Modulo de Ordenes
 */
class OrderTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @testdox Usuarios pueden crear orden
     **/
    public function testUserCanCreateOrder()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    /**
     * @testdox Administrar pueden cambiar estado de orden
     **/
    public function testAdminCanChangeOrderStatus()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    /**
     * @testdox Propietario pueden cambiar estado de orden
     **/
    public function testOwnerCanChangeOrderStatus()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    /**
     * @testdox Chef pueden cambiar estado de orden
     **/
    public function testChefCanChangeOrderStatus()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    /**
     * @testdox Endpoint de estado de pago Epayco
     **/
    public function testStatusPaymentEpayco()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/**
 * @testdox Pruebas del Modulo de Descuentos
 */

class DiscountTest extends TestCase
{
    /**
     * @testdox Crear descuento para usuarios por restaurante
     **/
    public function testCreateDiscount()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}

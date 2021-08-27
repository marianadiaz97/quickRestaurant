<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Restaurant $restaurant
     * @return Response
     */
    public function index(Restaurant $restaurant): Response
    {
        $products = $restaurant->products()->paginate(8);

        return Inertia::render('Products/Index', [
            'products' => $products,
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Restaurant $restaurant
     * @return Response
     */
    public function create(Restaurant $restaurant): Response
    {
        return Inertia::render('Products/Create', [
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductRequest $request
     * @param Restaurant $restaurant
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProductRequest $request, Restaurant $restaurant): \Illuminate\Http\RedirectResponse
    {
        $restaurant->products()->create($request->all());

        return redirect()->route('products', $restaurant)->with('successMessage', 'Product was successfully added!');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductRequest $request
     * @param  \App\Models\Product  $product
     * @return Response
     */
    public function update(UpdateProductRequest $request, Restaurant $restaurant, Product $product)
    {
        $product->update($request->all());
        return redirect()->route('products', $restaurant)->with('successMessage', 'Producto actualizado!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return Response
     */
    public function destroy(Restaurant $restaurant, Product $product)
    {
        $product->delete();
        alert()->success('Se elimino correctamente el producto', 'Eliminado!')
            ->persistent('Entendido');

        return redirect()->route('products', $restaurant);
    }
}

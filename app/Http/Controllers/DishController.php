<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDishRequest;
use App\Http\Requests\UpdateDishRequest;
use App\Models\Category;
use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Restaurant $restaurant
     * @return Response
     */
    public function index(Restaurant $restaurant): Response
    {
        $dishes = $restaurant->dishes()->with(['products'])
            ->paginate(5);

        return Inertia::render('Dishes/Index',[
            'dishes' => $dishes,
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @param Restaurant $restaurant
     * @return Response
     */

    public function create(Restaurant $restaurant): Response
    {
        $categories = $restaurant->categories ?? collect([]);

        $categoriesSelect = $categories->map(function ($r) {
            return ['value' => $r->id, 'label' => $r->name];
        });

        return Inertia::render('Dishes/Create', [
            'restaurant' => $restaurant,
            'categories' => $categoriesSelect,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateDishRequest $request
     * @param Restaurant $restaurant
     * @return RedirectResponse
     */
    public function store(CreateDishRequest $request, Restaurant $restaurant): RedirectResponse
    {
        /**@var Dish $dish*/
        $dish = Dish::query()->create([
            'name' => $request->get('name') ?? '',
            'price' => $request->get('price') ?? 0,
            'restaurant_id' => $restaurant->id ?? null,
            'category_id' => $request->get('category_id')
        ]);

        alert()->success("Se creo correctamente el plato", 'Guardado!')
            ->persistent('Ok');

        return redirect()->route('dishes', $restaurant);
    }

    /**
     * Display the specified resource.
     *
     * @param Dish $dish
     * @return \Illuminate\Http\Response
     */
    public function show(Dish $dish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Restaurant $restaurant
     * @param Dish $dish
     * @return Response
     */
    public function edit(Restaurant $restaurant, Dish $dish): Response
    {
        $dish->load('products');

        $categories =  $restaurant->categories ?? [];

        $categoriesSelect = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        });

        return Inertia::render('Dishes/Edit', [
            'dish' => $dish,
            'categories' => $categoriesSelect,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateDishRequest $request
     * @param Restaurant $restaurant
     * @param Dish $dish
     * @return RedirectResponse
     */
    public function update(UpdateDishRequest $request, Restaurant $restaurant, Dish $dish): RedirectResponse
    {
        $dish->update([
            'name' => $request->get('name') ?? '',
            'price' => $request->get('price') ?? 0,
            'restaurant_id' => $restaurant->id ?? null,
            'category_id' => $request->get('category_id'),
        ]);

        if ($request->hasFile('image')){

            if (Storage::disk('public')->exists($dish->image)){
                Storage::disk('public')->delete($dish->image);
            }

            $image = $request->image->store('dishes', 'public');
            $dish->image = $image;
            $dish->save();
        }

        alert()->success("Se edito correctamente el plato", 'Guardado!')
            ->persistent('Ok');

        return redirect()->route('dishes', $restaurant);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Dish $dish
     * @return RedirectResponse
     */
    public function destroy(Dish $dish): RedirectResponse
    {
        $dish->delete();
        return redirect()->route('dishes', $dish->restaurant);
    }

    public function changeStatus(Request $request, Dish $dish): RedirectResponse
    {
        $dish->disabled = $request->get('status');
        $dish->save();
        return redirect()->route('dishes', $dish->restaurant);
    }
}

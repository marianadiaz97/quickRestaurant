<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDishRequest;
use App\Http\Requests\UpdateDishRequest;
use App\Models\Category;
use App\Models\Dish;
use App\Models\Drink;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Restaurant $restaurant
     * @return Response
     */
    public function index(Restaurant $restaurant): Response
    {
        $drinks = $restaurant->drinks()->paginate(5);

        return Inertia::render('Drinks/Index',[
            'drinks' => $drinks,
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
        return Inertia::render('Drinks/Create', [
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateDishRequest $request
     * @param Restaurant $restaurant
     * @return RedirectResponse
     */
    public function store(Request $request, Restaurant $restaurant): RedirectResponse
    {
        /**@var Drink $drink*/
        $drink = Drink::query()->create([
            'restaurant_id' => $request->get('restaurant_id') ?? null,
            'name' => $request->get('name') ?? '',
            'price' => $request->get('price') ?? 0,
            'of_the_day' => $request->get('of_the_day') ?? false,
            'disabled' => $request->get('disabled') ?? false
        ]);

        alert()->success("Se creo correctamente la bebida", 'Guardado!')
            ->persistent('Ok');

        return redirect()->route('drinks', $restaurant);
    }

    /**
     * Display the specified resource.
     *
     * @param Drink $drink
     * @return \Illuminate\Http\Response
     */
    public function show(Drink $drink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Restaurant $restaurant
     * @param Drink $drink
     * @return Response
     */
    public function edit(Restaurant $restaurant, Drink $drink): Response
    {
        return Inertia::render('Drink/Edit', [
            'drink' => $drink,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateDishRequest $request
     * @param Restaurant $restaurant
     * @param Dish $drink
     * @return RedirectResponse
     */
    public function update(Request $request, Restaurant $restaurant, Drink $drink): RedirectResponse
    {
        $drink->update([
            'name' => $request->get('name') ?? '',
            'price' => $request->get('price') ?? 0,
            'of_the_day' => $request->get('of_the_day'),
            'disabled' => $request->get('disabled'),
        ]);

        if ($request->hasFile('image')){

            if (Storage::disk('public')->exists($drink->image)){
                Storage::disk('public')->delete($drink->image);
            }

            $image = $request->image->store('dishes', 'public');
            $drink->image = $image;
            $drink->save();
        }

        alert()->success("Se edito correctamente la bebida", 'Guardado!')
            ->persistent('Ok');

        return redirect()->route('drinks', $restaurant);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Drink $dish
     * @return RedirectResponse
     */
    public function destroy(Drink $drink): RedirectResponse
    {
        $drink->delete();
        return redirect()->route('dishes', $drink->restaurant);
    }

}

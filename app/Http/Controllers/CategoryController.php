<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCategoryRequest;
use App\Models\Category;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Restaurant $restaurant
     * @return Response
     */
    public function index(Restaurant $restaurant): Response
    {
        $categories = $restaurant->categories()
            ->paginate(6);

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
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
        return Inertia::render('Categories/Create', [
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateCategoryRequest $request
     * @param Restaurant $restaurant
     * @return RedirectResponse
     */

    public function store(CreateCategoryRequest $request, Restaurant $restaurant): RedirectResponse
    {
        /**@var Category $category*/
        $category = Category::query()->create([
            'name' => $request->get('name'),
            'restaurant_id' => $restaurant->id
        ]);

        alert()->success('Se guardo correctamente la categoría', 'Guardado!')
            ->persistent('Ok');

        return redirect()->route('categories', $restaurant);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Restaurant $restaurant
     * @param Category $category
     * @return Response
     */
    public function edit(Restaurant $restaurant, Category $category): Response
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Restaurant $restaurant
     * @param \App\Models\Category $category
     * @return RedirectResponse
     */
    public function update(Request $request, Restaurant $restaurant, Category $category): RedirectResponse
    {
        $category->update($request->all());
        return redirect()->route('categories', $restaurant)->with('successMessage', 'Categoria actualizada!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Restaurant $restaurant
     * @param Category $category
     * @return RedirectResponse
     * @throws \Exception
     */
    public function destroy(Restaurant $restaurant, Category $category): RedirectResponse
    {
        $category->delete();
        alert()->success('Se elimino correctamente la categoría', 'Eliminado!')
            ->persistent('Entendido');

        return redirect()->route('categories', $restaurant);
    }
}

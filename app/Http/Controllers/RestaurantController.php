<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRestaurantRequest;
use App\Http\Requests\UpdateRestaurantRequest;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use UxWeb\SweetAlert\SweetAlert;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $user = Auth::user();

        $restaurants = Restaurant::with('user')
            ->forUser($user)
            ->paginate(4);

        return Inertia::render('Restaurants/Index', [
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(): Response
    {
        $users =  User::all();
        $usersSelect = $users->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });

        return Inertia::render('Restaurants/Create', [
            'users' => $usersSelect
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreRestaurantRequest $request
     * @return RedirectResponse
     */
    public function store(StoreRestaurantRequest $request): RedirectResponse
    {
        Restaurant::create([
            'name' => $request->get('name'),
            'phone' => $request->get('phone'),
            'address' => $request->get('address'),
            'user_id' => $request->get('user_id'),
            'qr_code' => Str::random(8)
        ]);

        return redirect()->route('restaurants')->with('successMessage', 'User was successfully added!');
    }

    /**
     * Display the specified resource.
     *
     * @param Restaurant $restaurant
     * @return \Illuminate\Http\Response
     */
    public function show(Restaurant $restaurant)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param $qrCode
     * @return Response
     */
    public function showMenu($qrCode)
    {
        $restaurant = Restaurant::query()
            ->where('qr_code', $qrCode)
            ->first();

        if (!$restaurant){
            alert()->error('No se encontro el restaurante indicado', 'No encontramos tu restaurante!')
                ->persistent('Entendido');

            return redirect()->route('restaurants');
        }

        $restaurant->load(['categories.dishes.products']);
        $drinks = $restaurant
            ->drinks()
            ->where('disabled', false)
            ->where('of_the_day', true)
            ->get();

        return Inertia::render('Example', [
            'restaurant' => $restaurant,
            'drinks'     => $drinks
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Restaurant $restaurant
     * @return Response
     */
    public function edit(Restaurant $restaurant): Response
    {
        $users =  User::all();

        $usersSelect = $users->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });

        return Inertia::render('Restaurants/Edit', [
            'restaurant' => $restaurant,
            'users' => $usersSelect
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateRestaurantRequest $request
     * @param Restaurant $restaurant
     * @return RedirectResponse
     */
    public function update(UpdateRestaurantRequest $request, Restaurant $restaurant): RedirectResponse
    {
        $restaurant->update([
                'name' => $request->get('name'),
                'phone' => $request->get('phone'),
                'address' => $request->get('address'),
                'user_id' => $request->get('user_id'),
            ]);

        if ($request->hasFile('image_url')){

            if (Storage::disk('public')->exists($restaurant->image_url)){
                Storage::disk('public')->delete($restaurant->image_url);
            }
            $image = $request->image_url->store('restaurants', 'public');
            $restaurant->image_url = $image;
            $restaurant->save();
        }

        return redirect()->route('restaurants')->with('successMessage', 'User was successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Restaurant $restaurant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Restaurant $restaurant)
    {
        //
    }

    public function example($qrCode)
    {
        $restaurant = Restaurant::query()
            ->where('qr_code', $qrCode)
            ->first();

        if (!$restaurant){
            alert()->error('No se encontro el restaurante indicado', 'No encontramos tu restaurante!')
                ->persistent('Entendido');

            return redirect()->route('restaurants');
        }


        return Inertia::render('Example', [
            'restaurant' => $restaurant,
        ]);
    }
}

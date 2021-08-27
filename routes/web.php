<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DrinkController;
use App\Http\Controllers\Auth\LoginController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

Auth::routes(['verify' => false]);

Route::get('/example', [RestaurantController::class, 'example']);

Route::post('/users/dni', [UsersController::class, 'show'])->name('user-dni');

Route::get('/register/validate', [RegisterController::class, 'registerValidate'])->name('register-validate');
Route::post('/register/verify', [RegisterController::class, 'registerVerify'])->name('register-verify');
Route::get('/register/{restaurant}', [RegisterController::class, 'showRegistrationRestaurantForm']);
Route::post('/register/{restaurant}', [RegisterController::class, 'registerRestaurant']);

//Menu
Route::get('/restaurant/{qrCode}/menu', [RestaurantController::class, 'showMenu'])->name('restaurant-menu');
Route::get('/orders/{order}/confirm', [OrderController::class, 'confirm'])->name('confirm');
Route::get('/orders/{order}', [OrderController::class, 'checkout'])->name('checkout');
Route::post('/orders/create', [OrderController::class, 'storeOrder'])->name('orders.save');

Route::group(['middleware' => 'auth'], function () {

    //Order Status
    Route::post('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('update-status');
    Route::get('/user/{user}/orders', [OrderController::class, 'userOrders'])->name('user-orders');

    //Home
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::group(['middleware' => ['role:admin|owner|chef']], function () {
        Route::get('/restaurants', [RestaurantController::class, 'index'])->name('restaurants');
        Route::get('/restaurants/{restaurant}/orders', [OrderController::class, 'index'])->name('orders');
    });

    Route::group(['middleware' => ['role:admin|owner']], function () {

        Route::get('/restaurants/create', [RestaurantController::class, 'create'])->name('restaurants.create');
        Route::post('/restaurants', [RestaurantController::class, 'store'])->name('restaurants.store');
        Route::get('/restaurants/{restaurant}/edit', [RestaurantController::class, 'edit'])->name('restaurants.edit');
        Route::put('/restaurants/{restaurant}', [RestaurantController::class, 'update'])->name('restaurants.update');

        //Products
        Route::get('/restaurants/{restaurant}/products', [ProductController::class, 'index'])->name('products');
        Route::get('/restaurants/{restaurant}/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/restaurants/{restaurant}/products/create', [ProductController::class, 'store'])->name('products.store');
        //Route::get('/restaurants/{restaurant}/edit', [RestaurantController::class, 'edit'])->name('restaurants.edit');
        //Route::patch('/restaurants/{restaurant}', [RestaurantController::class, 'update'])->name('restaurants.update');

        //Categories
        Route::get('/restaurants/{restaurant}/categories', [CategoryController::class, 'index'])->name('categories');
        Route::get('/restaurants/{restaurant}/categories/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::post('/restaurants/{restaurant}/categories/create', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('/restaurants/{restaurant}/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
        Route::patch('/restaurants/{restaurant}/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/restaurants/{restaurant}/categories/{category}/delete', [CategoryController::class, 'destroy'])->name('categories.update');

        //Dishes
        Route::get('/restaurants/{restaurant}/dishes', [DishController::class, 'index'])->name('dishes');
        Route::get('/restaurants/{restaurant}/dishes/create', [DishController::class, 'create'])->name('dishes.create');
        Route::post('/restaurants/{restaurant}/dishes/create', [DishController::class, 'store'])->name('dishes.store');
        Route::get('/restaurants/{restaurant}/dishes/{dish}/edit', [DishController::class, 'edit'])->name('dishes.edit');
        Route::put('/restaurants/{restaurant}/dishes/{dish}/edit', [DishController::class, 'update'])->name('dishes.update');
        Route::post('/dishes/{dish}/status', [DishController::class, 'changeStatus'])->name('dishes.status');
        Route::delete('/dishes/{dish}', [DishController::class, 'destroy'])->name('dishes.delete');

        //Drinks
        Route::get('/restaurants/{restaurant}/drinks', [DrinkController::class, 'index'])->name('drinks');
        Route::get('/restaurants/{restaurant}/drinks/create', [DrinkController::class, 'create'])->name('drinks.create');
        Route::post('/restaurants/{restaurant}/drinks/create', [DrinkController::class, 'store'])->name('drinks.store');
        Route::get('/restaurants/{restaurant}/drinks/{drink}/edit', [DrinkController::class, 'edit'])->name('drinks.edit');
        Route::put('/restaurants/{restaurant}/drinks/{drink}/edit', [DrinkController::class, 'update'])->name('drinks.update');
        Route::delete('/drinks/{drink}', [DrinkController::class, 'destroy'])->name('drinks.delete');




        //Users
        Route::get('/users', [UsersController::class, 'index'])->name('users');
        Route::get('/users/create', [UsersController::class, 'create'])->name('users.create');
        Route::post('/users', [UsersController::class, 'store'])->name('restaurants.store');
        Route::get('/users/{user}/edit', [UsersController::class, 'edit'])->name('users.edit');
        Route::patch('/users/{user}', [UsersController::class, 'update'])->name('users.update');

        //Orders
        Route::post('/orders/{order}/status/admin', [OrderController::class, 'updateStatusAdmin'])->name('update-status-admin');

    });

});







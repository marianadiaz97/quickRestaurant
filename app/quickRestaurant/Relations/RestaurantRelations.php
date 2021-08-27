<?php

namespace App\quickRestaurant\Relations;

use App\Models\Category;
use App\Models\Dish;
use App\Models\Drink;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

trait RestaurantRelations
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'restaurant_user');
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function dishes(): HasMany
    {
        return $this->hasMany(Dish::class);

    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function drinks(): HasMany
    {
        return $this->hasMany(Drink::class);
    }
}

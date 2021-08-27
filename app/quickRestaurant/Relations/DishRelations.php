<?php

namespace App\quickRestaurant\Relations;

use App\Models\Category;
use App\Models\Product;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

trait DishRelations
{
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function category(): belongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function products(): belongsToMany
    {
        return $this->belongsToMany(Product::class, 'dish_product');
    }
}

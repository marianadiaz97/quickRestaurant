<?php

namespace App\quickRestaurant\Relations;

use App\Models\Dish;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait OrderDetailRelations
{
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function dish(): BelongsTo
    {
        return $this->belongsTo(Dish::class);
    }

}

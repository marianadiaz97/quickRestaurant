<?php

namespace App\quickRestaurant\Relations;

use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait ProductRelations
{
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}

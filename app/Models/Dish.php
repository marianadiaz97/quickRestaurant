<?php

namespace App\Models;

use App\quickRestaurant\Relations\DishRelations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dish extends Model
{
    use HasFactory;
    use DishRelations;
    use SoftDeletes;

    protected $fillable = [
        'restaurant_id',
        'name',
        'price',
        'disabled',
        'image',
        'category_id'
    ];
}

<?php

namespace App\Models;

use App\quickRestaurant\Relations\ProductRelations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use ProductRelations;
    use SoftDeletes;

    protected $fillable = ['restaurant_id', 'name', 'price', 'has_additional_price'];

}

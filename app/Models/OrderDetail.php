<?php

namespace App\Models;

use App\quickRestaurant\Relations\OrderDetailRelations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderDetail extends Model
{
    use HasFactory, OrderDetailRelations, SoftDeletes;

    protected $fillable = [
        'order_id',
        'dish_id',
        'dish_name',
        'quantity',
        'price',
        'drink_id',
        'drink_price',
        'drink_name'
    ];
}

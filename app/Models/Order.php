<?php

namespace App\Models;

use App\Http\Traits\Uuid;
use App\quickRestaurant\Relations\OrderRelations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory;
    use Uuid;
    use OrderRelations;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'payment_method',
        'status',
        'finished_at',
        'cancelled_at',
        'comment',
        'total',
    ];

}

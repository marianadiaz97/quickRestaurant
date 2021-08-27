<?php

namespace App\Models;

use App\quickRestaurant\Relations\CategoryRelations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;
    use CategoryRelations;
    use SoftDeletes;

    protected $fillable = ['name', 'restaurant_id'];

}

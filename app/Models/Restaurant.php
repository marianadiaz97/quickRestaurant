<?php

namespace App\Models;

use App\quickRestaurant\Relations\RestaurantRelations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Restaurant extends Model
{
    use HasFactory;
    use RestaurantRelations;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'qr_code',
        'name',
        'address',
        'phone',
        'image_url',
    ];

    public function scopeForUser($query, User $user)
    {
        if ($user->hasRole('admin')) {
            // No filter
        } elseif ($user->hasRole(['owner', 'chef'])) {
            $query->whereHas('users', function ($sub) use ($user) {
                $sub->where('users.id', $user->id);
            });
        }  else {
            $query->whereRaw('false'); // Return no results
        }
    }
}

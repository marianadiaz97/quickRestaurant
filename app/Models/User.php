<?php

namespace App\Models;

use App\quickRestaurant\Relations\UserRelations;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
    use HasPermissions;
    use HasFactory;
    use UserRelations;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'name',
        'phone',
        'email',
        'password',
        'email_verified_at',
        'restaurant_redirect',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function scopeSearch(Builder $query, $search): Builder
    {
        return $query->where('name', 'LIKE', "%${search}%")
            ->orWhere('first_name', 'LIKE', "%${search}%")
            ->orWhere('last_name', 'LIKE', "%${search}%")
            ->orWhere('phone', 'LIKE', "%${search}%")
            ->orWhere('email', 'LIKE', "%${search}%");
    }

    public function routeNotificationForNexmo($notification)
    {
        return "57".$this->phone;
    }

    public function scopeForUser($query, User $user)
    {
        if ($user->hasRole('admin')) {
            // No filter
        } elseif ($user->hasRole(['owner', 'chef'])) {

            // Only users belonging to one of his restaurants orders
            $restaurantIds = $user->restaurants->pluck('id');
            $query->whereHas('orders', function ($sub) use ($restaurantIds) {
                $sub->whereIn('orders.restaurant_id', $restaurantIds);
            })->orWhereHas('restaurants', function ($sub) use ($restaurantIds) {
                $sub->whereIn('restaurants.id', $restaurantIds);
            });
        }  else {
            $query->whereRaw('false'); // Return no results
        }
    }
}

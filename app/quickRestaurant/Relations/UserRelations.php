<?php

namespace App\quickRestaurant\Relations;

use App\Models\Order;
use App\Models\Restaurant;
use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

trait UserRelations
{
    public function restaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function verificationCode() {
        return $this->hasOne(VerificationCode::class, 'email', 'email');
    }

}

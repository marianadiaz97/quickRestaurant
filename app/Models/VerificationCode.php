<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable   = [
        'email',
        'code',
        'expires_at',
    ];

    public function isExpired($now)
    {
        return Carbon::parse($this->expires_at)->diffInMinutes($now) > config('constants.sms_time_minutes');
    }

    public function deleteExpiredCodes()
    {
        $codes = $this->all();
        $now = Carbon::now();

        foreach ($codes as $code) {
            if ($code->isExpired($now)) {
                $code->delete();
            }
        }
    }
}

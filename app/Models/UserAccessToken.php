<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAccessToken extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_uuid',
        'os',
        'browser',
        'ip_address',
        'token',
    ];
    protected $attributes = [
        'os' => null,
        'browser' => null,
        'ip_address' => null,
    ];
}

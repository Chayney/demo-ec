<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'image',
        'name',
        'postcode',
        'address',
        'building',
        'pay'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profileFavorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function profilePurchases()
    {
        return $this->hasMany(Purchase::class);
    }

    // JSON出力時に自動で含める
    protected $appends = ['image_url'];

    // 画像の絶対URLを返すアクセサ
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset($this->image);
        }
        return null;
    }
}

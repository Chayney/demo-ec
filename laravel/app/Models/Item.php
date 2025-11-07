<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'condition_id',
        'name',
        'description',
        'price',
        'image'
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function elements()
    {
        return $this->belongsToMany(Element::class, 'categories');
    }

    public function condition()
    {
        return $this->belongsTo(Condition::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
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

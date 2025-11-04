<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'item_id',
        'review'
    ];

    public function reviewProfile()
    {
        return $this->belongsTo(Profile::class, 'profile_id');
    }

    public function reviewItem()
    {
        return $this->belongsTo(Item::class);
    }
}

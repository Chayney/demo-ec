<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\Profile;

class ItemController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user && $user->userProfile) {
            $profile = Profile::where('user_id', $user->id)->first(['id']);
            $favorites = $profile->profileFavorites()->pluck('item_id')->toArray();
            $favoriteProducts = Item::whereIn('id', $favorites)->get();
            $products = Item::all();
        } else {
            $products = Item::all();
        }
        
        return response()->json($products, 200);
    }

    public function detail($id)
    {
        $product = Item::with(['elements','condition'])->where('id', $id)->first();
        
        return response()->json($product, 200);
    }

    public function confirm($id)
    {
        $product = Item::find($id);
        
        return response()->json($product, 200);
    }
}

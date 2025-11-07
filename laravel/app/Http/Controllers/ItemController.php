<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user) {
            $products = Item::where('user_id', $user->id)->get();
        } else {
            $products = Item::all();
        }
        
        return response()->json($products, 200);
    }

    public function detail($id)
    {
        $user = Auth::user();
        if ($user) {
            $product = Item::where('user_id', $user->id)->get();
        } else {
            $product = Item::find($id);
        }
        
        return response()->json($product, 200);
    }
}

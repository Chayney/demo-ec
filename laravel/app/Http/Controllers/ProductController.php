<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user) {
            $products = Product::where('user_id', $user->id)->get();
        } else {
            $products = Product::all();
        }
        
        return response()->json($products, 200);
    }
}

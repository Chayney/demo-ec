<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\Profile;
use App\Models\Condition;
use App\Models\Element;
use App\Models\Category;

class SellController extends Controller
{
    public function index()
    {
        $categories = Element::all();
        $conditions = Condition::all();
        
        return response()->json([
            'categories' => $categories,
            'conditions' => $conditions,
        ], 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // element_idsは単数でも配列でも対応
        $elementIds = $request->input('element_ids', []);
        if (!is_array($elementIds)) {
            $elementIds = [$elementIds];
        }

        // itemデータ
        $data = $request->only(['condition_id', 'name', 'description', 'price', 'image']);
        $data['profile_id'] = $user->id;

        // itemsテーブルに新規登録
        $item = Item::create($data);

        // categoriesテーブルにelement_idとitem_idを紐付けて保存
        foreach ($elementIds as $elementId) {
            Category::create([
                'item_id' => $item->id,
                'element_id' => $elementId,
            ]);
        }

        \Log::info([
            'item' => $item->toArray(),
            'categories' => $elementIds,
        ]);

        return response()->json([
            'message' => 'Item saved successfully',
            'data' => [
                'item' => $item,
                'element_ids' => $elementIds,
            ],
        ]);
    }

    // 画像アップロード処理
    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:2048',
        ]);

        $file = $request->file('file');
        $path = $file->store('images', 'public');

        return response()->json(['path' => $path], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\Profile;
use App\Models\Purchase;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();
        $items = Item::where('profile_id', $profile->id)->get();
        $purchasedItemIds = Purchase::where('profile_id', $profile->id)
            ->pluck('item_id')
            ->toArray();
        $purchaseItems = Item::whereIn('id', $purchasedItemIds)->get();

        return response()->json([
            'profile' => $profile,
            'items' => $items,
            'purchaseItems' => $purchaseItems,
        ], 200);
    }

    // mypageの編集画面表示
    public function list()
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();

        return response()->json($profile, 200);
    }

    // mypageの編集
    public function upload(Request $request)
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();
        $data = $request->only(['name', 'postcode', 'address', 'building']);
        $profile->update($data);

        return response()->json($profile, 200);
    }

    // 画像アップロード処理
    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:2048',
        ]);

        $user = Auth::user();
        $file = $request->file('file');

        // storage/app/public/images に保存
        $path = $file->store('images', 'public');
        
        $profile = Profile::where('user_id', $user->id)->first();
        $profile->image = $path;
        $profile->save();

        // 公開URLを生成して返す場合はフロントで変換する想定
        // ここではDB保存用のパスを返す
        return response()->json(['path' => $path], 200);
    }

    public function show()
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();

        return response()->json($profile, 200);
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();
        $data = $request->only(['postcode', 'address', 'building']);
        $profile->update($data);

        return response()->json($profile, 201);
    }

    public function look()
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();

        return response()->json($profile, 200);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();
        $data = $request->only(['pay']);
        $profile->update($data);

        return response()->json($profile, 201);
    }
}

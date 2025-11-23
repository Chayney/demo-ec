<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/signup', [AuthController::class, 'register']);
Route::post('/signin', [AuthController::class, 'login']);

Route::get('/products', [ItemController::class, 'index']);
Route::get('/product/{id}', [ItemController::class, 'detail']);

Route::middleware('jwt.auth')->group(function () {
    Route::post('/signout', [AuthController::class, 'logout']);
    Route::post('/authentication', [AuthController::class, 'check']);

    Route::get('/mypage', [ProfileController::class, 'index']);
    Route::get('/edit', [ProfileController::class, 'list']);
    Route::put('/edit', [ProfileController::class, 'upload']);
    // 画像アップロード(プロフィール専用)
    Route::post('/upload', [ProfileController::class, 'uploadImage']);

    Route::get('/sell', [SellController::class, 'index']);
    Route::post('/sell', [SellController::class, 'store']);
    // 画像アップロード(出品専用)
    Route::post('/sell/upload', [SellController::class, 'uploadImage']);

    Route::get('/purchase/{id}', [ItemController::class, 'confirm']);
    Route::get('/address', [ProfileController::class, 'show']);
    Route::put('/address', [ProfileController::class, 'edit']);
    Route::get('/pay', [ProfileController::class, 'look']);
    Route::put('/pay', [ProfileController::class, 'update']);
    
});

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $todos = Todo::where('user_id', $user->id)->get();

        return response()->json($todos, 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $todo = $request->only(['title', 'content']);
        $todo['user_id'] = $user->id;
        Todo::create($todo);

        return response()->json(201);
    }

    public function detail(Request $request)
    {
        $user = Auth::user();
        $todo = Todo::where('user_id', $user->id)->first();

        return response()->json($todo, 200);
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
        $todo = Todo::where('user_id', $user->id)->first();

        return response()->json($todo, 200);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $todo = Todo::where('id', $request->id)->where('user_id', $user->id)->first();
        $data = $request->only(['title', 'content']);
        $todo->update($data);

        return response()->json(200);
    }

    public function destroy(Request $request)
    {
        $user = Auth::user();
        $todo = Todo::where('user_id', $user->id)->first();
        $todo->delete();

        return response()->json(204);
    }
}

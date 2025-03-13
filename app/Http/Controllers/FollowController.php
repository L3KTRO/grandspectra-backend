<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{

    public function update(Request $request, $foreignParam): JsonResponse
    {
        $foreign = User::where('username', $foreignParam)->first();
        if (!$foreign) return response()->json(["message" => "User not found"]);

        $user = $request->user();

        if ($user->id === $foreign->id) {
            return response()->json(["message" => "You can't follow yourself"]);
        }

        if ($user->following()->where('following_id', $foreign->id)->exists()) {
            return response()->json(["message" => "You are already following this user"]);
        }

        $user->following()->attach($foreign->id);

        return response()->json(['message' => "You are now following $foreign->username"]);
    }

    public function destroy(Request $request, $foreignParam): JsonResponse
    {
        $foreign = User::where('username', $foreignParam)->first();
        if (!$foreign) return response()->json(["message" => "User not found"]);

        $user = Auth::user();

        if ($user->id === $foreign->id) {
            return response()->json(["message" => "You can't unfollow yourself"]);
        }

        if (!$user->following()->where('following_id', $foreign->id)->exists()) {
            return response()->json(["message" => "You are not following this user"]);
        }

        $user->following()->detach($foreign->id);

        return response()->json(['message' => "You are no longer following $foreign->username"]);
    }

}

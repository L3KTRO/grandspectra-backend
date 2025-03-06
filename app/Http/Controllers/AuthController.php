<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nickname' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed|min:8'
        ]);

        $user = User::create($validated);
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('vue-token')->plainTextToken
        ], 201);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        return response()->json([
            'token' => $request->user()->createToken('vue-token')->plainTextToken
        ]);
    }
}

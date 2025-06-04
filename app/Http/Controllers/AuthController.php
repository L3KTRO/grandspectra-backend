<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessVerifyMail;
use App\Mail\VerifyMail;
use App\Models\User;
use AWS\CRT\Log;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:5|max:20|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        ProcessVerifyMail::dispatch($user->id);

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Has cerrado sesión exitosamente'
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = \auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'username' => 'sometimes|string|min:5|max:20|unique:users,username,' . $user->id,
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed',
            "avatar" => "sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:10240", // 10MB max
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        if (isset($validated['avatar'])) {
            if ($user->avatar) Storage::disk("s3")->delete(basename($user->avatar));
            $randomName = uniqid() . '.' . $validated['avatar']->getClientOriginalExtension();

            Storage::disk("s3")->put($randomName, file_get_contents($validated['avatar']));

            $validated['avatar'] = Storage::disk("s3")->url($randomName);
        }

        // if email changed, mark email as not verified
        if (isset($validated['email']) && $validated['email'] !== $user->email) {
            $validated['email_verified_at'] = null; // Reset email verification
            ProcessVerifyMail::dispatch($user->id); // Resend verification email
        }

        $user->update($validated);

        return response()->json($user);
    }

    public function verifyUser(Request $request, $id)
    {
        if (!$request->hasValidSignature()) {
            return response()->json([
                'error' => 'Invalid signature or link expired',
            ], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'error' => 'User not found',
            ], 404);
        }

        $user->email_verified_at = now();
        $user->save();

        return redirect()->away("https://gs.lestro.top/#/profile");
    }

    public function resendVerification(): JsonResponse
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if ($user->email_verified_at) {
            return response()->json(['message' => 'User already verified'], 400);
        }

        ProcessVerifyMail::dispatch($user->id);

        return response()->json(['message' => 'Verification email resent successfully']);
    }
}

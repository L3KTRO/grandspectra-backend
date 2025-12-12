<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\AppliesSorting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    use AppliesSorting;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        [$users, $sort, $direction] = $this->applySorting(
            $request,
            $query,
            ['name', 'username', 'email', 'created_at'],
            'created_at',
            'desc'
        );

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => [
                'search' => $request->input('search'),
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'is_admin' => 'boolean',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin ?? false,
        ]);

        return redirect()->route('dashboard.users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load(['reviews', 'watchlist', 'ratings', 'watched']);

        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,'.$user->id,
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'is_admin' => 'boolean',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'is_admin' => $request->is_admin ?? $user->is_admin,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('dashboard.users.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->with('error', 'No puedes eliminar tu propia cuenta.');
        }

        $user->delete();

        return redirect()->route('dashboard.users.index')
            ->with('success', 'Usuario eliminado exitosamente.');
    }

    /**
     * Display a listing of trashed users.
     */
    public function trashed(Request $request)
    {
        $query = User::onlyTrashed();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            });
        }

        [$users, $sort, $direction] = $this->applySorting(
            $request,
            $query,
            ['name', 'username', 'email', 'created_at', 'deleted_at'],
            'deleted_at',
            'desc'
        );

        return Inertia::render('users/trashed', [
            'users' => $users,
            'filters' => [
                'search' => $request->input('search'),
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    /**
     * Restore a soft deleted user.
     */
    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);

        $user->restore();

        return redirect()->route('dashboard.users.trashed')
            ->with('success', 'Usuario restaurado exitosamente.');
    }

    /**
     * Permanently delete a user.
     */
    public function forceDestroy($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);

        if ($user->id === Auth::id()) {
            return back()->with('error', 'No puedes eliminar tu propia cuenta.');
        }

        $user->forceDelete();

        return redirect()->route('dashboard.users.trashed')
            ->with('success', 'Usuario eliminado permanentemente.');
    }
}

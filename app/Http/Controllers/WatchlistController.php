<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use App\Models\User;
use App\Models\Movie;
use App\Models\Tv;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    // Obtener lista de un usuario
    public function index(User $user)
    {
        return $user->watchlist()
            ->with(['movie', 'tv'])
            ->get()
            ->map(function ($item) {
                return $this->formatItem($item);
            });
    }

    // Añadir a la watchlist
    public function store(Request $request)
    {
        $user_id = $request->user()->id;

        $validated = $request->validate([
            'movie_id' => 'nullable|required_without:tv_id|exists:movies,id',
            'tv_id' => 'nullable|required_without:movie_id|exists:tv,id'
        ]);

        $watchlistItem = Watchlist::firstOrCreate(array_merge($validated, ['user_id' => $user_id]));
        return $this->formatItem($watchlistItem);
    }

    // Eliminar de la watchlist
    public function destroy(Watchlist $watchlist)
    {
        $watchlist->delete();
        return response()->json(['message' => 'Eliminado de la watchlist']);
    }

    private function formatItem(Watchlist $item)
    {
        return [
            'id' => $item->id,
            'content' => $item->movie ?? $item->tv,
            'added_at' => $item->created_at
        ];
    }
}

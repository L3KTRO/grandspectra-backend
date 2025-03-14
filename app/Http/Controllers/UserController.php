<?php

// app/Http/Controllers/Auth/UserController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Rating;
use App\Models\Tv;
use App\Models\User;
use App\Models\Watched;
use App\Models\Watchlist;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected Model $model;
    protected array $allowedFilters = ["username"];
    protected array $columns = ['*'];

    public array $relationships = ["followers", "following", 'ratings', "watched", "watchlist"];

    public function __construct()
    {
        $this->model = new User();
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user()->load($this->relationships));
    }

    public function index(Request $request): JsonResponse
    {
        $query = $this->model::query()->select($this->columns)->with($this->relationships)->orderBy("created_at", "desc");

        foreach ($this->allowedFilters as $filter) {
            if ($request->has($filter)) {
                $query->where($filter, "LIKE", $request->input($filter) . "%");
            }
        }

        $perPage = $request->input('per_page', 5);
        $data = $query->paginate($perPage);

        return response()->json([
            'data' => $data->items(),
            'meta' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage()
            ]
        ]);
    }

    public function show(string $username): JsonResponse
    {
        $record = $this->model::with($this->relationships)
            ->select($this->columns)
            ->where("username", $username)
            ->first();

        if (!$record) {
            return response()->json(["error" => "User not found"], 404);
        }

        return response()->json($record);
    }
}


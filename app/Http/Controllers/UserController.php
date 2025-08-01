<?php

// app/Http/Controllers/Auth/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected Model $model;
    protected array $allowedFilters = ["username"];
    protected array $columns = ['*'];

    public array $relationships = [
        "followers", "following", "ratings", "ratings.tv", "ratings.movie", "watched", "watchlist", "reviews", "personFollow",
        "contentLists", "contentListsSaved"
    ];

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
        $sorts = ["followers", "following", "ratings", "watched", "watchlist"];

        $validator = $request->validate([
            'per_page' => 'integer|min:1',
            'sort_by' => 'string|in:' . implode(",", $sorts),
            "relations" => "array",
            "relations.*" => "string|in:" . implode(",", $this->relationships),
        ]);
        $query = $this->model::query()->select($this->columns)->with($validator["relations"] ?? [])->withCount($sorts);

        if ($request->has('sort_by')) {
            $sortBy = $request->input('sort_by');
            if (in_array($sortBy, $sorts)) {
                $query->withCount($sortBy)->orderBy($sortBy . "_count", "desc");
            }
        }

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

        // Filtrar contentLists y contentListsSaved para eliminar los que tienen public = false
        if ($record->relationLoaded('contentLists')) {
            $record->setRelation('contentLists', $record->contentLists->where('public', true)->values());
        }

        return response()->json($record);
    }
}


<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

abstract class ReadOnlyController extends Controller
{
    protected Model $model;
    protected array $allowedFilters = [];
    protected array $columns = ['*'];
    public array $rels = ['credits.person', "credits.occupation", "genres"];

    /**
     * Obtiene múltiples registros con paginación y filtros
     *
     * @param Request $request
     * @return JsonResponse
     *
     * @url GET /
     */
    public function index(Request $request): JsonResponse
    {
        $query = $this->model::query()->select($this->columns);

        foreach ($this->allowedFilters as $filter) {
            if ($request->has($filter)) {
                $query->where($filter, $request->input($filter));
            }
        }

        $perPage = $request->input('per_page', 15);
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

    /**
     * Obtiene un registro específico por campo único
     *
     * @param string $id
     * @return JsonResponse
     *
     * @url GET /{id}
     */
    public function show(string $id): JsonResponse
    {
        $record = $this->model::with($this->rels)
            ->select($this->columns)
            ->where($this->model->getRouteKeyName(), $id)
            ->firstOrFail();

        return response()->json($record);
    }
}

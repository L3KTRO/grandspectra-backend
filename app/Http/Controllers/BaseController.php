<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

abstract class BaseController extends Controller
{
    protected Model $modelClass; // Clase del modelo asociada al controlador
    protected array $validationRules = []; // Reglas de validación específicas para cada entidad

    public function __construct($modelClass, array $validationRules)
    {
        $this->modelClass = $modelClass;
        $this->validationRules = $validationRules;
    }

    /**
     * Listar todos los registros.
     */
    public function index(): JsonResponse
    {

        $data = $this->modelClass::paginate(100);
        return response()->json(['data' => $data]);
    }

    /**
     * Mostrar un registro específico.
     */
    public function show($id): JsonResponse
    {
        $model = $this->modelClass::find($id);

        if (!$model) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        return response()->json(['data' => $model], 200);
    }
}

<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

trait TmdbImportable
{
    /**
     * Construye dinámicamente las reglas de validación para la importación
     * basándose en el $fillable y los casts definidos en el modelo.
     *
     * @return array
     */
    public static function getImportValidationRules(): array
    {
        $rules = [];
        $model = new static;
        $fillable = $model->getFillable();
        $casts = $model->getCasts();

        foreach ($fillable as $field) {
            if (isset($casts[$field])) {
                $rules[$field] = match ($casts[$field]) {
                    'string' => 'string',
                    'integer', 'int' => 'integer',
                    'double', 'float', 'real' => 'numeric',
                    'boolean', 'bool' => 'boolean',
                    default => 'nullable',
                };
            }
        }

        return $rules;
    }

    /**
     * Valida el registro de importación, elimina los campos extra que no están
     * definidos en $fillable, ajusta los valores de campos tipo string y realiza
     * la inserción o actualización (updateOrCreate), teniendo en cuenta si el id es nulo.
     *
     * @param array $record Datos importados de TMDB.
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public static function import(array $record): ?Model
    {
        // Generar reglas de validación basadas en el modelo
        $rules = static::getImportValidationRules();

        $validator = Validator::make($record, $rules);
        if ($validator->fails()) {
            error_log('Validation error on record id: ' . ($record['id'] ?? 'unknown') . ': ' . json_encode($validator->errors()->all()));
            return null; // Omitir el registro si la validación falla.
        }
        $validated = $validator->validated();

        // Obtener la lista de campos permitidos (definidos en $fillable)
        $modelInstance = new static;
        $fillable = $modelInstance->getFillable();

        // Filtrar: eliminar cualquier campo que no esté en $fillable
        $filtered = array_intersect_key($validated, array_flip($fillable));

        // Para cada campo de tipo string, asegúrate que su longitud no supere 255 caracteres.
        $casts = $modelInstance->getCasts();
        foreach ($filtered as $field => &$value) {
            if (isset($casts[$field]) && $casts[$field] === 'string' && is_string($value)) {
                $value = Str::limit($value, 250);
            }
        }
        unset($value);


        error_log(implode(', ', $filtered));

        // Usa updateOrCreate: si se especifica un id y no es nulo se usa ese valor para buscar coincidencia.
        try {
            return static::updateOrCreate(
                ['id' => $record['id']],
                $filtered
            );
        } catch (\Exception $e) {
            error_log('Error en updateOrCreate on record id ' . ($record['id'] ?? 'unknown') . ': ' . $e->getMessage());
            return null;
        }

    }


}

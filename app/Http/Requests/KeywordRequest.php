<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KeywordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {

        // Para creación (POST) se requiere el id y el name
        if ($this->isMethod('post')) {
            return [
                'id' => 'required|numeric',
                'name' => 'required|string',
            ];
        }
        // Para actualización (PUT/PATCH), el id viene por URL y solo se necesita validar el name
        return [
            'name' => 'sometimes|string',
        ];
    }
}

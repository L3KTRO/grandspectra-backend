<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TmdbCollectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Si es POST (creación)
        if ($this->isMethod('post')) {
            return [
                'id' => 'required|numeric',
                'name' => 'required|string',
            ];
        }
        // Si es PUT/PATCH (actualización)
        return [
            'name' => 'sometimes|string',
        ];
    }
}

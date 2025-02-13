<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        if ($this->isMethod('post')) {
            return [
                'id'         => 'required|numeric',
                'adult'      => 'required|boolean',
                'name'       => 'required|string',
                'popularity' => 'required|numeric',
            ];
        }
        return [
            'adult'      => 'sometimes|boolean',
            'name'       => 'sometimes|string',
            'popularity' => 'sometimes|numeric',
        ];
    }
}

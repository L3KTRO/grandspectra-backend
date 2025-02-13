<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        if ($this->isMethod('post')) {
            return [
                'id' => 'required|numeric',
                'original_title' => 'required|string|max:255',
                'popularity' => 'required|numeric',
            ];
        }
        return [
            'original_title' => 'sometimes|string|max:255',
            'popularity' => 'sometimes|numeric',
        ];
    }
}

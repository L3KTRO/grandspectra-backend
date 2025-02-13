<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Para creación (POST) aplicaremos las reglas "store"

        if ($this->isMethod('post')) {
            return [
                'email' => 'required|email|unique:users,email',
                'nickname' => 'required|string',
                'password' => 'required|string|min:6',
            ];
        }
        // Para actualización (PUT/PATCH) aplicamos reglas adaptadas
        return [
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($this->route('user')),
            ],
            'nickname' => 'sometimes|string',
            'password' => 'sometimes|string|min:6',
        ];
    }
}

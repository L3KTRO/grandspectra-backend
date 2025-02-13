<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TvNetworkRequest extends FormRequest
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
                'name' => 'required|string',
            ];
        }
        return [
            'name' => 'sometimes|string',
        ];
    }
}

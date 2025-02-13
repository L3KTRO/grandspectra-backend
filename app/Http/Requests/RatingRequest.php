<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RatingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        if ($this->isMethod('post')) {
            return [
                'user_id' => 'required|exists:users,id|unique:ratings,user_id',
                'tmdb_id' => 'required|integer',
                'qualification' => 'required|integer|min:1|max:10',
            ];
        }
        return [
            'user_id' => [
                'sometimes',
                'required',
                'exists:users,id',
                Rule::unique('ratings', 'user_id')->ignore($this->route('rating')),
            ],
            'tmdb_id' => 'sometimes|integer',
            'qualification' => 'sometimes|integer|min:1|max:10',
        ];
    }
}

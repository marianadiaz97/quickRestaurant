<?php

namespace App\Http\Requests;

use App\Rules\ValidateArrayElement;
use Illuminate\Foundation\Http\FormRequest;

class CreateDishRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:5',
            'price' => 'required|numeric|gt:0',
            'restaurant_id' => 'sometimes|required|exists:App\Models\Restaurant,id',
            'category_id'  => 'required|exists:App\Models\Category,id',
        ];
    }
}

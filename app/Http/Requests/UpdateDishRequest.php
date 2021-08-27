<?php

namespace App\Http\Requests;

use App\Rules\ValidateArrayElement;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDishRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'price' => 'required',
            'image' => ['image', 'sometimes', 'mimes:png,jpg,jpeg'],
            'restaurant_id' => 'sometimes|required|exists:App\Models\Restaurant,id',
            'category_id'  => 'required|exists:App\Models\Category,id',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'details' => 'required|array',
            'restaurant_id' => 'required|exists:App\Models\Restaurant,id',
            'details.*.dish_name' => 'required|string|exists:App\Models\Dish,name',
            'details.*.dish_id' => 'required|exists:App\Models\Dish,id',
            'details.*.quantity' => 'required|integer',
            'details.*.price' => 'required|numeric|exists:App\Models\Dish,price',
            'details.*.drink_id' => 'required|exists:App\Models\Drink,id',
            'details.*.drink_price' => 'required|numeric|exists:App\Models\Drink,price',
            'details.*.drink_name' => 'required|string|exists:App\Models\Drink,name',
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Rules\ValidateArrayElement;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'first_name' => 'required|string|max:50',
            'last_name'  => 'required|string|max:50',
            'name'  => 'required|string|max:50',
            'phone'      => 'required|string|max:12|min:10',
            'email'      => 'required|string|max:50',
            'role_id'    => 'required|integer',
            'restaurants_id.*' => 'required|array|exists:App\Models\Restaurant,id',
        ];
    }
}

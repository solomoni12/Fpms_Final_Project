<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CropRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'crop_name' => 'required|string|max:255',
            'planting_date' => 'required|date_format:Y-m-d',
            'harvest_date' => 'required|date_format:Y-m-d',
            'expected_product' => 'required|string|max:255'
        ];
    }
}

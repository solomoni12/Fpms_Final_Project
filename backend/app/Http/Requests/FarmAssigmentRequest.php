<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FarmAssigmentRequest extends FormRequest
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
            'task_name' => 'required|string|max:255',
            'status' => 'required|in:in progress,complete,incomplete',
            'time_start' => 'required|date|before_or_equal:time_assigned',
            'time_assigned' => 'required|date',
            'time_complished' => 'nullable|date|after_or_equal:time_start',
        ];
    }
}

<?php

namespace App\Http\Requests;

// use Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest
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

    public function rules(){
        return [
            'fname' => ['required', 'string', 'max:255', 'regex:/^[A-Za-z]+$/'],
            'lname' => ['required', 'string', 'max:255', 'regex:/^[A-Za-z]+$/'],
            'sex' => ['required', 'string', 'max:6', 'regex:/^(male|female)$/i'],
            'physical_address' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'digits:10', 'regex:/^0\d{9}$/'],
            'email' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()]
        ];
    }
}

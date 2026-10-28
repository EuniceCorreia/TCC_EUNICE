<?php

namespace App\Modules\Account\Http\Requests;

use App\Modules\Base\BaseRequest;

class UpdatePasswordRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email'                 => 'required|email|max:255',
            'token'                 => 'required|string|size:6',
            'password'              => ['required', 'confirmed', 'max:30'],
            'password_confirmation' => 'required|same:password|max:30',
        ];
    }

    public function attributeNames()
    {
        return [
            'email'                 => 'E-MAIL',
            'token'                 => 'Código',
            'password'              => 'Senha',
            'password_confirmation' => 'Confirmação de Senha',
        ];
    }

    public function messages()
    {
        return [
            'token.size' => 'Código precisa ter 6 dígitos.',
        ];
    }
}

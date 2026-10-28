<?php

namespace App\Modules\Account\ResetToken;

use App\Modules\Base\BaseRequest;

class ResetPasswordRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email'                 => 'required|email|max:255',
            'password'              => 'required|same:password_confirmation|max:30',
            'password_confirmation' => 'required|same:password|min:6|max:30',
            'token'                 => 'required|string',
        ];
    }

    public function attributeNames()
    {
        return [
            'email'                 => 'E-mail',
            'password'              => 'Nova senha',
            'password_confirmation' => 'Repita a nova senha',
        ];
    }

    public function messages()
    {
        return [
            'token.required' => 'Não foi possível realizar a requisição: Token inválido.',
        ];
    }
}

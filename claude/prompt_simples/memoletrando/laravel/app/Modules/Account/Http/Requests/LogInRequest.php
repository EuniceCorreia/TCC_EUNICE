<?php

namespace App\Modules\Account\Http\Requests;

use App\Modules\Base\BaseRequest;

class LogInRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'username' => 'required',
            'password' => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'username' => 'Usuário',
            'password' => 'Senha',
        ];
    }

    public function messages()
    {
        return [

        ];
    }
}

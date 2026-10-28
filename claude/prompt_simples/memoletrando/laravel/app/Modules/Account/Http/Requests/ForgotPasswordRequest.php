<?php

namespace App\Modules\Account\Http\Requests;

use App\Modules\Base\BaseRequest;

class ForgotPasswordRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email|max:255',
        ];
    }

    public function attributeNames()
    {
        return [
            'email' => 'E-mail',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}

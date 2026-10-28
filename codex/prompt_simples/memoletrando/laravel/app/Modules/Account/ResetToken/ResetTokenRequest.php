<?php

namespace App\Modules\Account\ResetToken;

use App\Modules\Base\BaseRequest;

class ResetTokenRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => "required|email|max:255",
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

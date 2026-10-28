<?php

namespace App\Modules\Themes\Http\Requests;

use App\Modules\Base\BaseRequest;

class ThemeRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            //
        ];
    }

    public function attributeNames()
    {
        return [
            //
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}

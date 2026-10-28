<?php

namespace App\Modules\Images\Http\Requests;

use App\Modules\Base\BaseRequest;

class ImageRequest extends BaseRequest
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

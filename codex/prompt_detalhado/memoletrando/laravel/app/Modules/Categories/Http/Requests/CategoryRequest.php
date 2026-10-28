<?php

namespace App\Modules\Categories\Http\Requests;

use App\Modules\Base\BaseRequest;

class CategoryRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'     => 'required|string|max:150',
            'active'   => 'required',
            'theme_id' => 'required|numeric',
        ];
    }

    public function attributeNames()
    {
        return [
            'name'     => 'Nome',
            'active'   => 'Ativo',
            'theme_id' => 'Tema',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}

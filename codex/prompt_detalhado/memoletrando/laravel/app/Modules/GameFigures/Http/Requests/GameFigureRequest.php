<?php

namespace App\Modules\GameFigures\Http\Requests;

use App\Modules\Base\BaseRequest;

class GameFigureRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'        => 'required|string|max:200',
            'description' => 'nullable',
            'active'      => 'required',
            'level_id'    => 'required|numeric',
            'category_id' => 'required|numeric',
            'user_id'     => 'required|numeric',
        ];
    }

    public function attributeNames()
    {
        return [
            'name'        => 'Palavra',
            'description' => 'Descrição',
            'active'      => 'Ativo',
            'level_id'    => 'Nível',
            'category_id' => 'Categoria',
            'user_id'     => 'Usuário',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}

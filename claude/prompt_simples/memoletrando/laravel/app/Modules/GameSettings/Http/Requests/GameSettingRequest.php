<?php

namespace App\Modules\GameSettings\Http\Requests;

use App\Modules\Base\BaseRequest;

class GameSettingRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'quantity_images' => 'required|numeric',
            'category_id'     => 'required|numeric',
            'level_id'        => 'required|numeric',
            'user_id'         => 'required|numeric',
        ];
    }

    public function attributeNames()
    {
        return [
            'quantity_images' => 'Número de Imagens',
            'category_id'     => 'Categoria',
            'level_id'        => 'Nível de Dificuldade',
            'user_id'         => 'Usuário',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}

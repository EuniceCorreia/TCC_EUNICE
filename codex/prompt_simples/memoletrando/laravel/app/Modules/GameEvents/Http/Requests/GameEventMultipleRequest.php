<?php

namespace App\Modules\GameEvents\Http\Requests;

use App\Modules\Base\BaseRequest;

class GameEventMultipleRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'ggame_events.*.type'           => 'required',
            'game_events.*.time'            => 'required',
            'game_events.*.game_setting_id' => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'game_events.*.type'            => 'Tipo',
            'game_events.*.time'            => 'Tempo',
            'game_events.*.game_setting_id' => 'ID do Jogo',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}

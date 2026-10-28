<?php

namespace App\Modules\Account\Http\Requests;

use App\Modules\Base\BaseRequest;

class AccessLevelRequest extends BaseRequest
{
    public function authorize()
    {
        return !empty($this->user());
    }

    public function rules()
    {
        return [
            'name'                      => 'required|max:200',
            'active'                    => 'required|boolean',
            'permissions.*.pivot.allow' => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'name'                      => 'NAME',
            'permissions.*.pivot.allow' => 'PERSMISSIONS',
            'active'                    => 'ACTIVE',
        ];
    }

    public function messages()
    {
        return [
            'permissions.*.pivot.allow.required' => 'Por favor informe as permissões.',
        ];
    }
}

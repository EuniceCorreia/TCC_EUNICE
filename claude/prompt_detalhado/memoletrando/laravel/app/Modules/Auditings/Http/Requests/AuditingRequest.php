<?php

namespace App\Modules\Auditings\Http\Requests;

use Webfloat\Base\BaseRequest;

class AuditingRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'           => 'required',
            'auditable_type' => 'required',
            'auditable_id'   => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'name'           => 'Nome para auditoria',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}

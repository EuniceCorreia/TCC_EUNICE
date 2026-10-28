<?php

namespace App\Modules\Account\Http\Requests;

use App\Modules\Base\BaseRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends BaseRequest
{
    public function authorize()
    {
        return !empty($this->user());
    }

    public function rules()
    {

        $id = $this->segment(3);
        return [
            'name'            => 'required|max:200',
            'access_level_id' => 'required|numeric',
            'username'        => "required|regex:/^[a-z0-9]*$/|unique:users,username,{$id},id,deleted_at,NULL|max:100",
            'password'        => ['required', 'confirmed', 'max:30', Password::min(8)->letters()->mixedCase()->numbers()->symbols()->uncompromised()],
            'email'           => "required|unique:users,email,{$id},id,deleted_at,NULL|email|max:255",
            'active'          => 'required|boolean',
        ];
    }

    public function attributeNames()
    {
        return [
            'access_level_id' => 'access level',
        ];
    }

    public function messages()
    {
        return [
        ];
    }
}

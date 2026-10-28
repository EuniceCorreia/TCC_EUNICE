<?php

namespace App\Modules\Account\Http\Requests;

use App\Modules\Base\BaseRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends BaseRequest
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
            'username'        => "required|regex:/^[a-z0-9]*$/|unique:users,username,{$id},id,deleted_at,NULL|max:100",
            'password'        => ['confirmed', 'max:30', ($this->password || $this->password_confirmation) ? Password::min(8)->letters()->mixedCase()->numbers()->symbols()->uncompromised() : 'nullable'],
            'email'           => "required|unique:users,email,{$id},id,deleted_at,NULL|email|max:255",
            'access_level_id' => 'required|numeric',
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

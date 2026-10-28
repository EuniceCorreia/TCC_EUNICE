<?php

namespace App\Modules\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Account\AccountException;
use App\Modules\Account\Auth\TokenService;
use App\Modules\Account\Http\Requests\LogInRequest;
use App\Modules\Account\Users\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TokenController extends Controller
{
    public function __construct(TokenService $token_service, UserService $user_service)
    {
        $this->token_service = $token_service;
        $this->user_service  = $user_service;
    }

    public function authenticate(LogInRequest $request)
    {
        $relations = $request->relations ?? [];
        $result    = $this->token_service->authenticate(
            $request->only('username', 'password'), $relations, true
        );

        if ($request['wheres']['system'] == 'true') {
            if ($result['user']->access_level_id == 3) {
                throw new AccountException(401, "Você não tem permissão para acessar o sistema!");
            }
        } else {
            if ($result['user']->access_level_id != 3) {
                throw new AccountException(401, "Você não tem permissão para acessar o jogo!");
            }

            if (isset($request->teacher_id) && !empty($request->teacher_id)) {
                try {
                    DB::beginTransaction();
                    $model = $this->user_service->model->findOrFail($result['user']->id);

                    $oxi = $model->update(['teacher_id' => $request->teacher_id]);
                    DB::commit();
                } catch (\Throwable $e) {
                    DB::rollback();
                    throw $e;
                }
            }
        }

        return response()->json([
            'error'  => false,
            'token'  => $result['token'],
            'pcrypt' => encrypt($request->password),
            'user'   => $result['user'],
        ]);
    }

    public function validateLogin(LogInRequest $request)
    {
        $decrypt = decrypt($request->toArray()['password']);

        $credentials = [
            'username' => $request->username,
            'password' => $decrypt,
        ];

        $relations = $request->relations ?? [];
        $result    = $this->token_service->validateLogin(
            $credentials, $relations, false
        );

        return response()->json([
            'error'  => false,
            'token'  => $result['token'],
            'pcrypt' => $request->password,
            'user'   => $result['user'],
        ]);
    }

    public function validateToken(Request $request)
    {
        $relations = $request->relations ?? [];

        return response()->json(
            $this->token_service->validateToken($request->token ?? '', $relations, true)
        );
    }
}

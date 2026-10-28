<?php

namespace App\Modules\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Account\AccountException as AppAccountException;
use App\Modules\Account\Auth\AuthService;
use App\Modules\Account\Auth\TokenService;
use App\Modules\Account\Http\Requests\CheckResetTokenRequest;
use App\Modules\Account\Http\Requests\ForgotPasswordRequest;
use App\Modules\Account\Http\Requests\LogInRequest;
use App\Modules\Account\Http\Requests\StoreUserRequest;
use App\Modules\Account\Http\Requests\UpdatePasswordRequest;
use App\Modules\Account\Http\Requests\UpdateUserRequest;
use App\Modules\Account\Users\UserService;
use App\Modules\Base\Utilities\UtilityService;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct(
        UserService $user_service,
        AuthService $auth_service,
        UtilityService $utility_service,
        TokenService $token_service
    ) {
        // $this->authorizeResource("App\Modules\Account\Users\User", "App\Modules\Account\Users\User");
        $this->user_service    = $user_service;
        $this->auth_service    = $auth_service;
        $this->token_service   = $token_service;
        $this->utility_service = $utility_service;
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'find'     => 'view',
            'get'      => 'view',
            'paginate' => 'view',
            'restore'  => 'restore',
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $user = $this->user_service->store(
            $request->except('relations'),
            $request->only('relations')
        );

        return response()->json([
            'error'   => false,
            'user'    => $user,
            'message' => __('sg.account::toasts.users.store'),
        ]);
    }

    public function show($id)
    {
        if ($id === 'authenticated' && Auth::check() && Auth::user()->authenticable) {
            return response()->json([
                'error' => false,
                'user'  => Auth::user()->load('authenticable.address', 'authenticable.phone'),
            ], 200);
        }

        return response()->json([
            'error' => true,
            'user'  => 'Erro na autenticação',
        ], 200);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = $this->user_service->update(
            $request->except('relations'),
            $id,
            $request->only('relations')
        );

        return response()->json([
            'error'   => false,
            'user'    => $user,
            'message' => __('sg.account::toasts.users.update', [], 'en-us'),
        ]);
    }

    public function destroy($id)
    {
        $this->user_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.account::toasts.users.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->user_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('sg.account::toasts.users.restore'),
        ]);
    }

    public function authenticate(LogInRequest $request)
    {
        if ($this->auth_service->authenticate($request->toArray())) {
            // return redirect('sistema');
            return response()->json(
                [
                    'error'   => false,
                    'message' => 'Autenticado com sucesso',
                ], 200);
        }

        return response()->json(
            [
                'error'   => true,
                'message' => __('sg.account::toasts.users.wrong_credentials'),
            ], 200);

        // return redirect('login')->withInput()->with('status', ['error', ]);

    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'user'  => $this->user_service->api->find($request->toArray()),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'users' => $this->user_service->api->get($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        $req = $request->toArray();

        return response()->json(
            $this->user_service->api->paginate($req)
        );
    }

    public function checkEmailAvailability(Request $request)
    {
        return response()->json([
            'error'  => false,
            'exists' => $this->utility_service->exists('users', 'email', $request->email),
        ]);
    }

    public function sendResetLinkEmail(ForgotPasswordRequest $request)
    {
        $this->user_service->sendResetLinkEmail($request->toArray());

        return response()->json([
            'error'   => false,
            'message' => __('sg.account::toasts.password_reset_email_sent'),
        ]);
    }

    public function validateResetToken(CheckResetTokenRequest $request)
    {

        if (!$this->user_service->validateResetToken($request->toArray())) {
            throw new AppAccountException(400, 'E-mail ou Código inválido');
        }

        return response()->json([
            'error' => false,
            'valid' => true,
        ]);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $relations = $request->relations ?? [];

        $this->user_service->updatePassword(
            $request->email,
            $request->token,
            $request->password
        );

        $result = $this->token_service->authenticateByEmail([
            'email'    => $request->email,
            'password' => $request->password,
        ], $relations, true);

        return response()->json([
            'error'   => false,
            'message' => __('sg.account::toasts.update-password'),
            'user'    => $result['user'],
            'pcrypt'  => encrypt($request->email),
            'token'   => $result['token'],
        ]);
    }

    public function getTeachers(Request $request)
    {
        return response()->json([
            'error' => false,
            'users' => $this->user_service->api->get($request->toArray()),
        ]);
    }
}

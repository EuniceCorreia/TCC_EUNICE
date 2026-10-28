<?php

namespace App\Modules\Account\Auth;

use App\Modules\Account\AccountException;
use App\Modules\Account\Users\User;
use App\Modules\Auditings\AuditingService;
use Tymon\JWTAuth\Facades\JWTAuth;

class TokenService
{
    public function __construct(User $user, AuditingService $audit_service)
    {
        $this->model         = $user;
        $this->audit_service = $audit_service;
    }

    /**
     * Realiza a autentiação e retorna usuário e token
     *
     * @var array $credentials
     * ['username', 'password']
     * @return bool
     */
    public function authenticate(array $credentials, array $relations = [], bool $make_visible = false)
    {
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                throw new AccountException(401, __('sg.account::toasts.users.wrong_credentials'));
            }
            $user = $this->model->where('username', $credentials['username'])->firstOrFail();

            if (empty($user->active)) {
                throw new AccountException(401, 'Seu Usuário está Inativo');
            }
            if ($make_visible) {
                $user->makeVisible('super_admin');
            }

            $this->load($user, $relations);

            $this->auditAction('login', $user);

        } catch (\Exception $e) {
            throw $e;
        }

        return compact('token', 'user');
    }

    public function validateLogin(array $credentials, array $relations = [], bool $make_visible = false)
    {
        try {
            if (!$token = auth('api')->attempt($credentials)) {
                throw new AccountException(401, __('sg.account::toasts.users.wrong_credentials'));
            }

            $user = $this->model->where('username', $credentials['username'])->firstOrFail();

            if ($make_visible) {
                $user->makeVisible('super_admin');
            }

            $this->load($user, $relations);
        } catch (\Exception $e) {
            throw $e;
        }

        return compact('token', 'user');
    }

    /**
     * Realiza a autentiação por e-mail e retorna usuário e token
     *
     * @var array $credentials
     * ['email', 'password']
     * @return bool
     */
    public function authenticateByEmail(array $credentials, array $relations = [], bool $make_visible = false)
    {
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                throw new AccountException(401, __('sg.account::toasts.users.wrong_credentials'));
            }

            $user = $this->model->where('email', $credentials['email'])->firstOrFail();

            if ($make_visible) {
                $user->makeVisible('super_admin');
            }

            $this->auditAction('login', $user);

            $this->load($user, $relations);
        } catch (\Exception $e) {
            throw $e;
        }

        return compact('token', 'user');
    }

    /**
     * Valida o token enviado e retorna as informações do usuário
     *
     * @var string $token Token JWT
     *
     * @var array $relations Relações do eloquent
     * para serem retornadas junto ao modelo
     *
     * @var bool $make_visible Retornar ou não informações para administradores
     *
     * @return \App\Modules\Account\Users\User
     */
    public function validateToken(string $token = '', array $relations = [], bool $make_visible = false)
    {
        try {
            if (empty($token) || $token == 'null') {
                throw new AccountException(401, 'Token inválido');
            }

            $user = auth('api')->setToken($token)->user();

            if (!empty($user)) {

                if ($make_visible) {
                    $user->makeVisible('super_admin');
                }

                $this->load($user, $relations);
            } else {
                throw new AccountException(401, __('sg.account::toasts.users.wrong_credentials'));
            }
        } catch (\Exception $e) {
            throw $e;
        }

        return $user;
    }

    private function load(User&$user, array $relations = [])
    {
        if (!empty($relations)) {
            try {
                $user = call_user_func_array([$user, 'load'], $relations);
            } catch (RelationNotFoundException $e) {
                $message = $e->getMessage();
                \Log::warning("Tentou carregar relação não existente [$message]");
            }
        }
    }

    public function auditAction($action = null, $user)
    {

        if ($action == 'login') {

            $audit['subject_type'] = 'users';
            $audit['log_name']     = 'audit';
            $audit['subject_id']   = $user->id;
            $audit['causer_id']    = $user->id;
            $audit['causer_type']  = 'users';
            $audit['description']  = 'logged into the system';
            $audit['subject']      = 'login';

            $this->audit_service->store($audit);

        }

    }

}

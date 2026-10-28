<?php

/**
 * Encapsula toda a manipulação de sessão do jogo.
 */
final class Auth
{
    public static function start(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function login(int $userId, string $userName): void
    {
        self::start();
        $_SESSION['ID'] = $userId;
        $_SESSION['nome'] = $userName;
    }

    public static function isLoggedIn(): bool
    {
        self::start();

        return isset($_SESSION['nome']);
    }

    public static function currentUserName(): ?string
    {
        self::start();

        return $_SESSION['nome'] ?? null;
    }

    public static function logout(): void
    {
        self::start();
        $_SESSION = [];
        session_destroy();
    }
}

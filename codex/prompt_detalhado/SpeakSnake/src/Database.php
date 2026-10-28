<?php

require_once __DIR__ . '/../config/app.php';

final class DatabaseConnectionException extends RuntimeException {}

/**
 * Encapsula a conexão mysqli.
 */
final class Database
{
    private static ?mysqli $connection = null;

    public static function connection(): mysqli
    {
        if (self::$connection instanceof mysqli) {
            return self::$connection;
        }

        AppConfig::load();

        $mysqli = new mysqli(
            AppConfig::dbHost(),
            AppConfig::dbUser(),
            AppConfig::dbPassword(),
            AppConfig::dbName(),
            AppConfig::dbPort()
        );

        if ($mysqli->connect_error) {
            throw new DatabaseConnectionException('Falha ao conectar ao banco de dados: ' . $mysqli->connect_error);
        }

        self::$connection = $mysqli;

        return self::$connection;
    }
}

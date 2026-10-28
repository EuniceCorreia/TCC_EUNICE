<?php

/**
 * AppConfig centraliza a leitura de props.properties.
 */
final class AppConfigException extends RuntimeException {}

final class AppConfig
{
    private static ?array $properties = null;

    public static function load(): void
    {
        if (self::$properties !== null) {
            return;
        }

        $propertiesFile = __DIR__ . '/props.properties';
        $parsed = parse_ini_file($propertiesFile);

        if ($parsed === false) {
            throw new AppConfigException("Não foi possível ler o arquivo de configuração: {$propertiesFile}");
        }

        self::$properties = $parsed;
    }

    private static function get(string $key, string $default = ''): string
    {
        self::load();

        $value = self::$properties[$key] ?? '';
        return $value !== '' ? $value : $default;
    }

    public static function dbHost(): string
    {
        return self::get('HOST', 'localhost');
    }

    public static function dbPort(): int
    {
        return (int) self::get('PORT', '3306');
    }

    public static function dbUser(): string
    {
        return self::get('USER', 'root');
    }

    public static function dbPassword(): string
    {
        return self::get('PASSWORD');
    }

    public static function dbName(): string
    {
        return self::get('DATABASE');
    }

    public static function assetsPath(): string
    {
        return self::get('ASSETS', 'assets/');
    }

    public static function baseUrl(): string
    {
        return self::get('BASEURL', '/');
    }

    public static function adminPassword(): string
    {
        return self::get('ADMIN_PASSWORD');
    }
}

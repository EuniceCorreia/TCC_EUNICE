<?php

require_once __DIR__ . '/Database.php';

final class RepositoryException extends RuntimeException {}

/**
 * Base dos repositórios: centraliza o ciclo prepare → bind → execute → close
 * de prepared statements, para que cada repositório declare apenas o SQL.
 */
abstract class MysqliRepository
{
    private mysqli $connection;

    public function __construct(mysqli $connection)
    {
        $this->connection = $connection;
    }

    /**
     * Executa um comando sem retorno (INSERT, UPDATE, DELETE).
     *
     * @param string $types Tipos no formato de mysqli_stmt::bind_param (ex.: 'si').
     */
    protected function execute(string $sql, string $types = '', ...$params): void
    {
        $this->withStatement($sql, $types, $params, static function (): void {
        });
    }

    /**
     * Retorna a primeira linha do resultado, ou null se não houver nenhuma.
     *
     * @return array<string, mixed>|null
     */
    protected function fetchOne(string $sql, string $types = '', ...$params): ?array
    {
        return $this->withStatement($sql, $types, $params, static function (mysqli_stmt $statement): ?array {
            return $statement->get_result()->fetch_assoc() ?: null;
        });
    }

    /**
     * Retorna todas as linhas do resultado.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function fetchAll(string $sql, string $types = '', ...$params): array
    {
        return $this->withStatement($sql, $types, $params, static function (mysqli_stmt $statement): array {
            return $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        });
    }

    /**
     * Prepara e executa o statement, entrega-o a $handler e garante o close().
     *
     * @param array<int, mixed> $params
     * @return mixed O valor retornado por $handler.
     */
    private function withStatement(string $sql, string $types, array $params, callable $handler)
    {
        $statement = $this->connection->prepare($sql);

        if ($statement === false) {
            throw new RepositoryException('Falha ao preparar consulta: ' . $this->connection->error);
        }

        try {
            if ($types !== '') {
                $statement->bind_param($types, ...$params);
            }

            if (!$statement->execute()) {
                throw new RepositoryException('Falha ao executar consulta: ' . $statement->error);
            }

            return $handler($statement);
        } finally {
            $statement->close();
        }
    }
}

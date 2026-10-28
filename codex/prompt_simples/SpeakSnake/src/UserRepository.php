<?php

require_once __DIR__ . '/Database.php';

/**
 * Agrupa as operações relacionadas à tabela `ssusers`.
 */
final class UserRepository
{
    private mysqli $connection;

    public function __construct(mysqli $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @return array<string, mixed>|null
     */
    public function findByName(string $name): ?array
    {
        return $this->fetchByName('SELECT * FROM ssusers WHERE nome = ? LIMIT 1', $name);
    }

    public function existsByName(string $name): bool
    {
        return $this->fetchByName('SELECT 1 FROM ssusers WHERE nome = ? LIMIT 1', $name) !== null;
    }

    public function create(string $name): void
    {
        $statement = $this->executeByName('INSERT INTO ssusers (nome) VALUES (?)', $name);
        $statement->close();
    }

    /**
     * @return array<string, mixed>|null
     */
    private function fetchByName(string $query, string $name): ?array
    {
        $statement = $this->executeByName($query, $name);

        try {
            $result = $statement->get_result();

            if ($result === false) {
                throw new RuntimeException('Falha ao obter o resultado da consulta de usuário.');
            }

            try {
                return $result->fetch_assoc() ?: null;
            } finally {
                $result->free();
            }
        } finally {
            $statement->close();
        }
    }

    /**
     * Executa uma consulta com um nome e transfere o fechamento ao chamador.
     */
    private function executeByName(string $query, string $name): mysqli_stmt
    {
        $statement = $this->connection->prepare($query);

        if ($statement === false) {
            throw new RuntimeException('Falha ao preparar a consulta de usuário.');
        }

        try {
            if (!$statement->bind_param('s', $name) || !$statement->execute()) {
                throw new RuntimeException('Falha ao executar a consulta de usuário.');
            }
        } catch (Throwable $error) {
            $statement->close();
            throw $error;
        }

        return $statement;
    }
}

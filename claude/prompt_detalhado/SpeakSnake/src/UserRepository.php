<?php

require_once __DIR__ . '/Database.php';

/**
 * Agrupa todas as operações relacionadas à tabela `ssusers`.
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
        $statement = $this->executeWithName('SELECT * FROM ssusers WHERE nome = ?', $name);
        $user = $statement->get_result()->fetch_assoc();
        $statement->close();

        return $user ?: null;
    }

    public function existsByName(string $name): bool
    {
        return $this->findByName($name) !== null;
    }

    public function create(string $name): void
    {
        $this->executeWithName('INSERT INTO ssusers (nome) VALUES (?)', $name)->close();
    }

    /**
     * Prepara e executa uma consulta cujo único parâmetro é o nome do usuário.
     * Cabe ao chamador fechar o statement retornado.
     */
    private function executeWithName(string $sql, string $name): mysqli_stmt
    {
        $statement = $this->connection->prepare($sql);
        $statement->bind_param('s', $name);
        $statement->execute();

        return $statement;
    }
}

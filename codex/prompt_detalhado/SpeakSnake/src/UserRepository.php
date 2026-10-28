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

    public function findByName(string $name): ?array
    {
        $statement = $this->executeForName('SELECT * FROM ssusers WHERE nome = ?', $name);

        $result = $statement->get_result();
        $user = $result->fetch_assoc();
        $statement->close();

        return $user ?: null;
    }

    public function existsByName(string $name): bool
    {
        return $this->findByName($name) !== null;
    }

    public function create(string $name): void
    {
        $statement = $this->executeForName('INSERT INTO ssusers (nome) VALUES (?)', $name);
        $statement->close();
    }

    private function executeForName(string $sql, string $name): mysqli_stmt
    {
        $statement = $this->connection->prepare($sql);
        $statement->bind_param('s', $name);
        $statement->execute();

        return $statement;
    }
}

<?php

require_once __DIR__ . '/Database.php';

/**
 * Agrupa as operações relacionadas à tabela `ssinfos`
 * (tentativas de pronúncia de cada palavra).
 */
final class WordAttemptRepository
{
    private mysqli $connection;

    public function __construct(mysqli $connection)
    {
        $this->connection = $connection;
    }

    public function record(string $userName, string $word, string $difficulty, int $attempts): void
    {
        $statement = $this->connection->prepare(
            'INSERT INTO ssinfos (nome, palavra, dificuldade, tentativas) VALUES (?, ?, ?, ?)'
        );
        $statement->bind_param('sssi', $userName, $word, $difficulty, $attempts);
        $statement->execute();
        $statement->close();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function allByUserName(string $userName): array
    {
        $statement = $this->connection->prepare('SELECT * FROM ssinfos WHERE nome = ?');
        $statement->bind_param('s', $userName);
        $statement->execute();

        $result = $statement->get_result();
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        $statement->close();

        return $rows;
    }
}

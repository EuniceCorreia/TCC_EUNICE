<?php

require_once __DIR__ . '/Database.php';

final class ScoreRepositoryException extends RuntimeException {}

/**
 * Agrupa as operações relacionadas à tabela `ssscores`.
 */
final class ScoreRepository
{
    private mysqli $connection;

    public function __construct(mysqli $connection)
    {
        $this->connection = $connection;
    }

    public function record(string $userName, int $wordsCount, int $attemptsCount, int $score): void
    {
        $statement = $this->connection->prepare(
            'INSERT INTO ssscores (nome, palavras, tentativas, pontuacao) VALUES (?, ?, ?, ?)'
        );
        $statement->bind_param('siii', $userName, $wordsCount, $attemptsCount, $score);
        $statement->execute();
        $statement->close();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function allOrderedByScoreDescending(): array
    {
        $result = $this->connection->query('SELECT * FROM ssscores ORDER BY pontuacao DESC');

        $scores = [];
        while ($row = $result->fetch_assoc()) {
            $scores[] = $row;
        }

        return $scores;
    }

    public function deleteById(int $id): void
    {
        $statement = $this->connection->prepare('DELETE FROM ssscores WHERE ID = ?');
        $statement->bind_param('i', $id);

        if (!$statement->execute()) {
            $error = $statement->error;
            $statement->close();
            throw new ScoreRepositoryException('Falha ao deletar estatística: ' . $error);
        }

        $statement->close();
    }
}

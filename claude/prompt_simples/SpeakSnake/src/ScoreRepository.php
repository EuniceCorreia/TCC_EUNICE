<?php

require_once __DIR__ . '/MysqliRepository.php';

/**
 * Agrupa as operações relacionadas à tabela `ssscores`.
 */
final class ScoreRepository extends MysqliRepository
{
    public function record(string $userName, int $wordsCount, int $attemptsCount, int $score): void
    {
        $this->execute(
            'INSERT INTO ssscores (nome, palavras, tentativas, pontuacao) VALUES (?, ?, ?, ?)',
            'siii',
            $userName,
            $wordsCount,
            $attemptsCount,
            $score
        );
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function allOrderedByScoreDescending(): array
    {
        return $this->fetchAll('SELECT * FROM ssscores ORDER BY pontuacao DESC');
    }

    public function deleteById(int $id): void
    {
        $this->execute('DELETE FROM ssscores WHERE ID = ?', 'i', $id);
    }
}

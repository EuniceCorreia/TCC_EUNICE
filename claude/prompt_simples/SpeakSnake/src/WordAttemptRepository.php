<?php

require_once __DIR__ . '/MysqliRepository.php';

/**
 * Agrupa as operações relacionadas à tabela `ssinfos`
 * (tentativas de pronúncia de cada palavra).
 */
final class WordAttemptRepository extends MysqliRepository
{
    public function record(string $userName, string $word, string $difficulty, int $attempts): void
    {
        $this->execute(
            'INSERT INTO ssinfos (nome, palavra, dificuldade, tentativas) VALUES (?, ?, ?, ?)',
            'sssi',
            $userName,
            $word,
            $difficulty,
            $attempts
        );
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function allByUserName(string $userName): array
    {
        return $this->fetchAll('SELECT * FROM ssinfos WHERE nome = ?', 's', $userName);
    }
}

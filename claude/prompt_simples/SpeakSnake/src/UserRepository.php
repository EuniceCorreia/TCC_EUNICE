<?php

require_once __DIR__ . '/MysqliRepository.php';

/**
 * Agrupa todas as operações relacionadas à tabela `ssusers`.
 */
final class UserRepository extends MysqliRepository
{
    /**
     * @return array<string, mixed>|null
     */
    public function findByName(string $name): ?array
    {
        return $this->fetchOne('SELECT * FROM ssusers WHERE nome = ?', 's', $name);
    }

    public function existsByName(string $name): bool
    {
        return $this->fetchOne('SELECT 1 FROM ssusers WHERE nome = ? LIMIT 1', 's', $name) !== null;
    }

    public function create(string $name): void
    {
        $this->execute('INSERT INTO ssusers (nome) VALUES (?)', 's', $name);
    }
}

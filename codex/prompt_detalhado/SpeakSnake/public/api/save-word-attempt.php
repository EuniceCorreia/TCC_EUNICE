<?php

require_once __DIR__ . '/../../src/bootstrap.php';

function requiredPostField(string $field): string
{
    if (!isset($_POST[$field]) || $_POST[$field] === '') {
        throw new InvalidArgumentException("Campo obrigatório ausente: {$field}");
    }

    return (string) $_POST[$field];
}

header('Content-Type: application/json');

try {
    $userName = requiredPostField('nome');
    $word = requiredPostField('palavra');
    $difficulty = requiredPostField('dificuldade');
    $attempts = (int) requiredPostField('tentativas');

    $repository = new WordAttemptRepository(Database::connection());
    $repository->record($userName, $word, $difficulty, $attempts);

    echo json_encode(['success' => true]);
} catch (Throwable $exception) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $exception->getMessage()]);
}

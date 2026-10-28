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
    $wordsCount = (int) requiredPostField('palavras');
    $attemptsCount = (int) requiredPostField('tentativas');
    $score = (int) requiredPostField('pontuacao');

    $repository = new ScoreRepository(Database::connection());
    $repository->record($userName, $wordsCount, $attemptsCount, $score);

    echo json_encode(['success' => true]);
} catch (Throwable $exception) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $exception->getMessage()]);
}

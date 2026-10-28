<?php

require_once __DIR__ . '/../../src/bootstrap.php';

header('Content-Type: application/json');

try {
    if (!isset($_POST['id'])) {
        throw new InvalidArgumentException('Campo obrigatório ausente: id');
    }

    $repository = new ScoreRepository(Database::connection());
    $repository->deleteById((int) $_POST['id']);

    echo json_encode(['success' => true]);
} catch (Throwable $exception) {
    echo json_encode(['success' => false, 'error' => $exception->getMessage()]);
}

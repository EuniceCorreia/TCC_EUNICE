<?php

require_once __DIR__ . '/../../src/bootstrap.php';

header('Content-Type: application/json');

$userName = $_GET['nome'] ?? '';

$repository = new WordAttemptRepository(Database::connection());
echo json_encode($repository->allByUserName($userName));

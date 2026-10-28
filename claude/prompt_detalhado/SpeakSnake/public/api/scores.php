<?php

require_once __DIR__ . '/../../src/bootstrap.php';

header('Content-Type: application/json');

$repository = new ScoreRepository(Database::connection());
echo json_encode($repository->allOrderedByScoreDescending());

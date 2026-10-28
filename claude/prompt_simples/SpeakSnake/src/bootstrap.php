<?php

/**
 * Ponto único de inicialização do backend.
 */

require_once __DIR__ . '/../config/app.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Auth.php';
require_once __DIR__ . '/MysqliRepository.php';
require_once __DIR__ . '/UserRepository.php';
require_once __DIR__ . '/ScoreRepository.php';
require_once __DIR__ . '/WordAttemptRepository.php';

AppConfig::load();

<?php

require_once __DIR__ . '/../src/bootstrap.php';

$userName = Auth::currentUserName() ?? '';
$assetsPath = AppConfig::assetsPath();
?>
<!DOCTYPE html>
<html lang="pt" dir="auto">
<head>
    <meta charset="utf-8">
    <title>SpeakSnake</title>
    <link rel="icon" href="assets/miniLogo.png" type="image/png">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/game.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
<body>
    <input type="hidden" id="nomeUsuario" value="<?php echo htmlspecialchars($userName); ?>">
    <input type="hidden" id="assetsPath" value="<?php echo htmlspecialchars($assetsPath); ?>">

    <main class="fullscreen">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha384-1H217gwSVyLSIfaLxHbE7dRb3v4mYCKbpQvzx0cegeju1MVsGrX5xXxAvs/HgeFs" crossorigin="anonymous"></script>

        <div class="wrapper" id="wrapper">
            <div class="game-details">
                <span id="score">Pontos: 000</span>
                <div class="controle-direcao">
                    <div id="cima" class="direcao">⭡</div>
                    <div id="esquerda" class="direcao">⭠</div>
                    <div id="baixo" class="direcao">⭣</div>
                    <div id="direita" class="direcao">⭢</div>
                </div>
                <div class="game-actions">
                    <button id="pausar" class="pausar">Pausar</button>
                    <button id="finalizar" class="finalizar">Finalizar</button>
                </div>
            </div>
            <canvas id="play-board"></canvas>
        </div>
        <div class="mFala" id="mFala">
            <h2 class="mFala-title">Fale</h2>
            <h1 class="mFala-word" id="palavra" aria-live="polite">Aguardando palavra</h1>
            <button id="listenBtn">
                <span class="material-icons">volume_up</span>
                Ouvir novamente
            </button>
            <div class="button container">
                <button id="skipBtn" class="skipBtn">Pular palavra</button>
                <button id="endBtn" class="endBtn">Finalizar partida</button>
            </div>
            <h3>Vidas restantes</h3>
            <div id="lives">
                <i class="material-icons life-icon" id="L1">favorite</i>
                <i class="material-icons life-icon" id="L2">favorite</i>
                <i class="material-icons life-icon" id="L3">favorite</i>
            </div>
        </div>
        <div class="mPontos" id="mPontos">
            <svg class="wave-divider wave-divider--light" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 12 Q 25 0 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12"></path>
            </svg>
            <h2 class="mPontos-title">Você acertou!</h2>
            <h2 class="mPontos-subtitle">Ganhou</h2>
            <h1 class="mPontos-value" id="pontosPalavra" aria-label="Pontos ganhos">0</h1>
            <h2 class="mPontos-subtitle">pontos</h2>
        </div>
        <div class="mVitoria" id="mVitoria">
            <h2 class="mVitoria-title">Parabéns!</h2>
            <h2 class="mVitoria-title">Suas conquistas:</h2>
            <h3 class="mVitoria-value" id="numPalavras" aria-label="Número de palavras acertadas">0</h3>
            <h3 class="mVitoria-value" id="palavraFinal">Palavras</h3>
            <h3 class="mVitoria-value" id="numPontos" aria-label="Pontuação total obtida">0</h3>
            <h3 class="mVitoria-value" id="pontuacao">Pontos</h3>
            <button class="boardBtn" id="boardBtn" data-action="new-selection">Jogar novamente</button>
            <button class="returnBtn1" id="returnBtn1" data-action="logout">Trocar usuário</button>
        </div>
        <div id="hudImagemPalavra">
            <div class="wordContainer">
                <div class="countdown-container" style="display: none;">
                    <svg class="countdown-circle" width="120" height="120">
                        <circle class="bg" cx="60" cy="60" r="54"></circle>
                        <circle class="progress" cx="60" cy="60" r="54"></circle>
                    </svg>
                    <div class="countdown-text" id="countdownText">10</div>
                </div>
                <img id="gifFalando" src="assets/imagens/recording.gif" alt="Animação de espera">
                <span id="palavraFalada"></span>
            </div>
            <div class="modal-content"></div>
            <img id="imagemPalavra" class="imagemPalavra" alt="Palavra">
        </div>

        <script src="js/game/main.js" type="module" defer></script>
        <script src="js/pages/game-page.js" defer></script>
    </main>
</body>
</html>

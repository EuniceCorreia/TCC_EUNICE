<!DOCTYPE html>
<html lang="pt" dir="auto">
<head>
    <meta charset="utf-8">
    <title>SpeakSnake - Estatísticas</title>
    <link rel="icon" href="assets/miniLogo.png" type="image/png">
    <link rel="stylesheet" href="css/credits.css">
    <link rel="stylesheet" href="css/estatisticas.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha384-1H217gwSVyLSIfaLxHbE7dRb3v4mYCKbpQvzx0cegeju1MVsGrX5xXxAvs/HgeFs" crossorigin="anonymous"></script>
    <header>
        <nav>
            <ul>
                <li><a href="index.php">Início</a></li>
                <li><a href="selecao.php">Seleção</a></li>
                <li><a href="estatisticas.php" class="is-active">Estatísticas</a></li>
                <li><a href="credits.html">Créditos</a></li>
            </ul>
        </nav>
    </header>
    <h1>Estatísticas</h1>
    <svg class="wave-divider" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 12 Q 25 0 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12"></path>
    </svg>
    <p>Acompanhe o desempenho de cada jogador do SpeakSnake.</p>
    <button id="refreshButton">Atualizar</button>
    <div class="stats-controls">
        <label for="itensPorPagina">Itens por página:</label>
        <select name="ItensPorPagina" id="itensPorPagina">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
        <div id="paginacaoContainer"></div>
    </div>
    <div id="buscaContainer">
        <label for="buscaInput" class="visually-hidden">Pesquisar</label>
        <input id="buscaInput" placeholder="Filtrar">
        <label for="tipoFiltro" class="visually-hidden">Tipo de filtro</label>
        <select id="tipoFiltro">
            <option value="nome">Nome</option>
            <option value="pontuacao">Pontuação</option>
            <option value="palavras">Palavras</option>
            <option value="tentativas">Tentativas</option>
        </select>
        <button id="filtrarButton">Filtrar</button>
        <button id="limparFiltroButton">Limpar</button>
    </div>
    <div id="estatisticasContainer"></div>
    <div id="paginacaoContainer2"></div>
</body>
<script type="module" src="js/pages/stats/stats-controller.js"></script>
</html>

<!DOCTYPE html>
<html lang="pt" dir="auto">

<head>
    <meta charset="utf-8">
    <title>SpeakSnake</title>
    <link rel="icon" href="assets/miniLogo.png" type="image/png">
    <link rel="stylesheet" href="css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha384-1H217gwSVyLSIfaLxHbE7dRb3v4mYCKbpQvzx0cegeju1MVsGrX5xXxAvs/HgeFs" crossorigin="anonymous"></script>

    <div class="mEscuro" id="mEscuro">
        <div class="mSelecao" id="mSelecao">
            <img class="brand-logo" src="assets/imagens/spk2logo.png" alt="Logo SpeakSnake">
            <svg class="wave-divider" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 12 Q 25 0 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12"></path>
            </svg>

            <h3>Dificuldade</h3>
            <div class="container">
                <div class="radio-tile-group">
                    <div class="input-container">
                        <input id="facilBtn" type="radio" name="radios" value="true" checked>
                        <div class="radio-tile">
                            <i class="material-icons">local_florist</i>
                            <label for="facilBtn">Fácil</label>
                        </div>
                    </div>
                    <div class="input-container">
                        <input id="dificilBtn" type="radio" name="radios" value="false">
                        <div class="radio-tile">
                            <i class="material-icons">waves</i>
                            <label for="dificilBtn">Difícil</label>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Tema</h3>
            <div class="container">
                <div class="radio-tile-group">
                    <div class="input-container">
                        <input type="radio" id="Sustentabilidade" name="radios2" value="1" checked>
                        <div class="radio-tile">
                            <i class="material-icons">eco</i>
                            <label for="Sustentabilidade">Sustentabilidade</label>
                        </div>
                    </div>
                    <div class="input-container">
                        <input type="radio" id="EducacaoFinanceira" name="radios2" value="2">
                        <div class="radio-tile">
                            <i class="material-icons">attach_money</i>
                            <label for="EducacaoFinanceira">Educação Financeira</label>
                        </div>
                    </div>
                    <div class="input-container">
                        <input type="radio" id="AlimentacaoSaudavel" name="radios2" value="3">
                        <div class="radio-tile">
                            <i class="material-icons">water_drop</i>
                            <label for="AlimentacaoSaudavel">Alimentação Saudável</label>
                        </div>
                    </div>
                </div>
            </div>
            <button class="boardBtn" id="boardBtn">Jogar</button>
        </div>
    </div>
    <button class="returnBtn1" id="returnBtn1">Trocar Usuário</button>
</body>
<footer>
    <p>© 2024 SpeakSnake. Todos os direitos reservados.</p>
    <a href="credits.html">Créditos</a>
</footer>
<script type="module" src="js/pages/selecao.js"></script>

</html>

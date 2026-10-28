<?php

require_once __DIR__ . '/../src/bootstrap.php';

/**
 * Processa a submissão do formulário de login.
 */
function handleLoginSubmission(UserRepository $users): ?string
{
    if (!isset($_POST['nome'])) {
        return null;
    }

    $name = trim($_POST['nome']);

    if ($name === '') {
        return 'Digite seu nome';
    }

    $user = $users->findByName($name);

    if ($user === null) {
        return 'Falha ao logar';
    }

    Auth::login((int) $user['ID'], $user['nome']);

    $isAdminLogin = !empty($_POST['senha']) && $_POST['senha'] === AppConfig::adminPassword();
    $redirectTarget = $isAdminLogin ? 'estatisticas.php' : 'selecao.php';

    header("Location: {$redirectTarget}");
    exit;
}

$users = new UserRepository(Database::connection());
$loginErrorMessage = handleLoginSubmission($users);

$assetsPath = AppConfig::assetsPath();
?>
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
    <main>
        <div class="mLogin" id="mLogin">
            <img class="brand-logo" src="assets/imagens/spk2logo.png" alt="Logo SpeakSnake">
            <svg class="wave-divider" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 12 Q 25 0 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12"></path>
            </svg>
            <form method="post" name="loginForm" id="loginForm">
                <h3>Escreva seu nome completo</h3>
                <label for="nome">Nome</label>
                <input id="nome" type="text" name="nome" placeholder="Nome" autocomplete="name">
                <label for="senha">Senha (opcional)</label>
                <input id="senha" type="password" name="senha" placeholder="Senha (opcional)" autocomplete="current-password">
                <button type="submit" class="Login" id="Login">Entrar</button>
                <br>
            </form>
            <button class="registerBtn" id="registerBtn" data-action="register">Criar cadastro</button>
        </div>
    </main>
    <footer>
        <p>© 2024 SpeakSnake. Todos os direitos reservados.</p>
        <a href="credits.html">Créditos</a>
    </footer>
</body>
<script src="js/pages/login.js" defer></script>
<?php if ($loginErrorMessage !== null): ?>
<script>
    window.addEventListener('DOMContentLoaded', () => alert(<?php echo json_encode($loginErrorMessage); ?>));
</script>
<?php endif; ?>
</html>

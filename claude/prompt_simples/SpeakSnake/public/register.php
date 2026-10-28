<?php

require_once __DIR__ . '/../src/bootstrap.php';

/**
 * Processa o cadastro de um novo usuário.
 *
 * @return array{message: string, redirect: bool}|null
 */
function handleRegistrationSubmission(UserRepository $users): ?array
{
    if (!isset($_POST['username1'])) {
        return null;
    }

    $name = trim($_POST['username1']);
    $message = '';
    $redirect = false;

    if ($name === '') {
        $message = 'Por favor, insira um nome válido.';
    } elseif ($users->existsByName($name)) {
        $message = 'Usuário já cadastrado, tente outro nome!';
    } else {
        $users->create($name);
        $message = 'Usuário cadastrado com sucesso!';
        $redirect = true;
    }

    return ['message' => $message, 'redirect' => $redirect];
}

$users = new UserRepository(Database::connection());
$registrationResult = handleRegistrationSubmission($users);
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

    <div class="mEscuro" id="mEscuro">
        <div class="mRegister" id="mRegister">
            <img class="brand-logo" src="assets/imagens/spk2logo.png" alt="Logo SpeakSnake">
            <svg class="wave-divider" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 12 Q 25 0 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12"></path>
            </svg>
            <form method="post" name="loginForm" id="loginForm">
                <h3>Escreva seu nome completo</h3>
                <label for="username1">Nome</label>
                <input type="text" id="username1" name="username1" placeholder="Nome" autocomplete="name">
                <button type="submit" class="registerBtn" id="registerBtn">Cadastrar</button>
                <br>
            </form>
            <button class="returnBtn" id="returnBtn" data-action="logout">Voltar</button>
        </div>
    </div>
</body>
<script src="js/pages/register.js" defer></script>
<?php if ($registrationResult !== null): ?>
<script>
    window.addEventListener('DOMContentLoaded', () => {
        alert(<?php echo json_encode($registrationResult['message']); ?>);
        <?php if ($registrationResult['redirect']): ?>
        window.location.href = 'index.php';
        <?php endif; ?>
    });
</script>
<?php endif; ?>
</html>

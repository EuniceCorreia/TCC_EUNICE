/**
 * Navegação da página de jogo.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('[data-action="logout"]')?.addEventListener('click', logout);
    document.querySelector('[data-action="new-selection"]')?.addEventListener('click', newSelection);
});

function logout() {
    window.location.href = 'logout.php';
}

function newSelection() {
    window.location.href = 'selecao.php';
}

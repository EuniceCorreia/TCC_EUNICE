/**
 * Comportamento da página de cadastro.
 */
document.addEventListener('DOMContentLoaded', () => {
    const returnBtn = document.getElementById('returnBtn');
    returnBtn?.addEventListener('click', logout);
});

function logout() {
    window.location.href = 'logout.php';
}

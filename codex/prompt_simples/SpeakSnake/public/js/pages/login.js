/**
 * Comportamento da página de login.
 */
document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('registerBtn');
    registerBtn?.addEventListener('click', redirectToRegister);
});

function redirectToRegister() {
    window.location.href = 'register.php';
}

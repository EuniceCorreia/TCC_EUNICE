/**
 * Exibe notificações temporárias (badges) de sucesso/erro.
 */
export function showBadge(status, message = '') {
    const badgeElement = document.createElement('span');
    badgeElement.classList.add('badge');

    if (status === 'error') {
        badgeElement.classList.add('badge-error');
        badgeElement.textContent = `❌ - ${message}`;
    } else if (status === 'success') {
        badgeElement.classList.add('badge-success');
        badgeElement.textContent = message ? `✅ - ${message}` : '✅ - Dados carregados com sucesso';
    } else {
        return;
    }

    document.body.appendChild(badgeElement);
    setTimeout(() => badgeElement.remove(), 3000);
}

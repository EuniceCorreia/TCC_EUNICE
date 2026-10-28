/**
 * Modal que exibe as tentativas de pronúncia de um jogador.
 */
export async function showPlayerWordAttempts(playerName) {
    const response = await fetch(`api/word-attempts.php?nome=${encodeURIComponent(playerName)}`);
    const attempts = await response.json();

    if (attempts.length === 0) {
        alert('Nenhum dado disponível para este jogador.');
        return;
    }

    openModal(buildAttemptsTable(attempts));
}

function buildAttemptsTable(attempts) {
    const rows = attempts
        .map(
            (attempt) => `
                <tr style="border-top:1px solid #ccc;">
                    <td style="padding:8px;">${attempt.palavra}</td>
                    <td style="padding:8px;">${attempt.dificuldade}</td>
                    <td style="padding:8px;">${attempt.tentativas}</td>
                </tr>`
        )
        .join('');

    return `
        <table style="width:100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color:#eee;">
                    <th style="padding:8px;">Palavra</th>
                    <th style="padding:8px;">Dificuldade</th>
                    <th style="padding:8px;">Tentativas</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function openModal(innerHtml) {
    const overlay = document.createElement('div');
    overlay.className = 'stats-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.innerHTML = innerHtml;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.className = 'stats-modal-close';
    closeButton.addEventListener('click', () => overlay.remove());

    modal.appendChild(closeButton);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
}

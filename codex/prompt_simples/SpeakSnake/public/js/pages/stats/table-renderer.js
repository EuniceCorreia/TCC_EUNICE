/**
 * Renderiza a tabela principal de estatísticas.
 */
import { showPlayerWordAttempts } from './player-modal.js';

const SORTABLE_COLUMNS = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'pontuacao', label: 'Pontuação' },
    { key: 'palavras', label: 'Palavras' },
    { key: 'tentativas', label: 'Tentativas' },
];

export function renderScoresTable({ containerId, scores, activeSortKey, onSort, onDelete }) {
    const container = document.getElementById(containerId);

    const headerCells = SORTABLE_COLUMNS.map(
        (column) => `<th id="th-${column.key}" class="${column.key === activeSortKey ? 'th_active' : ''}">${column.label}</th>`
    ).join('');

    const rows = scores
        .map(
            (row) => `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.nome}</td>
                    <td>${row.pontuacao}</td>
                    <td>${row.palavras}</td>
                    <td>${row.tentativas}</td>
                    <td>
                        <button data-action="view" data-name="${row.nome}" title="Ver jogo">👁️</button>
                        <button data-action="delete" data-id="${row.id}" title="Deletar">🗑️</button>
                    </td>
                </tr>`
        )
        .join('');

    container.innerHTML = `
        <table>
            <tr>${headerCells}<th id="th-acaoes">Ações</th></tr>
            ${rows}
        </table>`;

    for (const column of SORTABLE_COLUMNS) {
        document.getElementById(`th-${column.key}`).addEventListener('click', () => onSort(column.key));
    }

    container.querySelectorAll('[data-action="view"]').forEach((button) => {
        button.addEventListener('click', () => showPlayerWordAttempts(button.dataset.name));
    });

    container.querySelectorAll('[data-action="delete"]').forEach((button) => {
        button.addEventListener('click', () => onDelete(Number(button.dataset.id)));
    });
}

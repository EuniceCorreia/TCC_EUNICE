/**
 * Orquestra a página de estatísticas.
 */
import { showBadge } from './badge.js';
import { Paginator } from './paginator.js';
import { sortScores, filterScores } from './sorting.js';
import { renderScoresTable } from './table-renderer.js';

class StatsPageController {
    constructor() {
        this.allScores = [];
        this.visibleScores = [];
        this.itemsPerPage = 10;
        this.sortKey = 'pontuacao';
        this.filterField = 'nome';

        this.paginator = new Paginator({
            topContainerId: 'paginacaoContainer',
            bottomContainerId: 'paginacaoContainer2',
            onPageChange: () => this.render(),
        });
    }

    async init() {
        this.bindStaticControls();
        await this.reloadScores();
    }

    bindStaticControls() {
        document.getElementById('refreshButton').addEventListener('click', () => this.reloadScores());
        document.getElementById('filtrarButton').addEventListener('click', () => this.applyFilter());
        document.getElementById('limparFiltroButton').addEventListener('click', () => this.clearFilter());
        document.getElementById('buscaInput').addEventListener('input', () => this.applyFilter());
        document.getElementById('tipoFiltro').addEventListener('change', (event) => {
            this.filterField = event.target.value;
            this.applyFilter();
        });
        document.getElementById('itensPorPagina').addEventListener('change', (event) => {
            this.itemsPerPage = Number(event.target.value);
            this.paginator.goToPage(0);
            this.render();
        });
    }

    async reloadScores() {
        this.clearFilterInput();

        try {
            const response = await fetch('api/scores.php');
            const data = await response.json();

            showBadge('success', 'Dados carregados com sucesso');

            this.allScores = data.map((row) => ({
                id: row.ID,
                nome: row.nome,
                pontuacao: Number(row.pontuacao),
                palavras: row.palavras,
                tentativas: row.tentativas,
            }));

            this.visibleScores = sortScores(this.allScores, this.sortKey);
            this.render();
        } catch (error) {
            showBadge('error', `Falha ao carregar dados: ${error.message}`);
        }
    }

    applyFilter() {
        const searchTerm = document.getElementById('buscaInput').value;
        this.visibleScores = sortScores(filterScores(this.allScores, this.filterField, searchTerm), this.sortKey);
        this.paginator.goToPage(0);
        this.render();
    }

    clearFilterInput() {
        document.getElementById('buscaInput').value = '';
    }

    clearFilter() {
        this.clearFilterInput();
        this.visibleScores = sortScores(this.allScores, this.sortKey);
        this.paginator.goToPage(0);
        this.render();
    }

    sortBy(key) {
        this.sortKey = key;
        this.visibleScores = sortScores(this.visibleScores, key);
        this.render();
    }

    async deleteScore(id) {
        if (!confirm('Tem certeza que deseja deletar essa estatística?')) {
            return;
        }

        try {
            const response = await fetch('api/delete-score.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${encodeURIComponent(id)}`,
            });
            const result = await response.json();

            if (result.success) {
                showBadge('success', 'Estatística deletada com sucesso');
                await this.reloadScores();
            } else {
                showBadge('error', `Falha ao deletar estatística: ${result.error}`);
            }
        } catch (error) {
            showBadge('error', `Erro ao deletar estatística: ${error.message}`);
        }
    }

    render() {
        this.paginator.setTotalItems(this.visibleScores.length, this.itemsPerPage);
        this.paginator.render();

        const start = this.paginator.currentPage * this.itemsPerPage;
        const pageItems = this.visibleScores.slice(start, start + this.itemsPerPage);

        renderScoresTable({
            containerId: 'estatisticasContainer',
            scores: pageItems,
            activeSortKey: this.sortKey,
            onSort: (key) => this.sortBy(key),
            onDelete: (id) => this.deleteScore(id),
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StatsPageController().init();
});

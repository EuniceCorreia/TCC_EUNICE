/**
 * Controla a paginação da tabela de estatísticas.
 */

const PAGE_WINDOW_SIZE = 4;
const PAGE_JUMP_SIZE = 5;

export class Paginator {
    constructor({ topContainerId, bottomContainerId, onPageChange }) {
        this.topContainer = document.getElementById(topContainerId);
        this.bottomContainer = document.getElementById(bottomContainerId);
        this.onPageChange = onPageChange;
        this.currentPage = 0;
        this.totalPages = 0;
    }

    setTotalItems(totalItems, itemsPerPage) {
        this.totalPages = Math.ceil(totalItems / itemsPerPage);
    }

    goToPage(page) {
        if (page < 0 || page >= this.totalPages) {
            return;
        }
        this.currentPage = page;
        this.onPageChange(this.currentPage);
    }

    render() {
        this.topContainer.innerHTML = '';
        this.bottomContainer.innerHTML = '';

        this.#appendToBothContainers(this.#createNavButton('⏮️', 'Primeira Página', this.currentPage === 0, () => this.goToPage(0)));
        this.#appendToBothContainers(this.#createNavButton('⬅️', 'Voltar 5 Páginas', this.currentPage === 0, () => this.goToPage(Math.max(0, this.currentPage - PAGE_JUMP_SIZE))));

        for (const pageNumber of this.#visiblePageNumbers()) {
            this.#appendToBothContainers(this.#createPageButton(pageNumber));
        }

        const isLastPage = this.currentPage >= this.totalPages - 1;
        this.#appendToBothContainers(this.#createNavButton('➡️', 'Avançar 5 Páginas', isLastPage, () => this.goToPage(Math.min(this.totalPages - 1, this.currentPage + PAGE_JUMP_SIZE))));
        this.#appendToBothContainers(this.#createNavButton('⏭️', 'Última Página', isLastPage, () => this.goToPage(this.totalPages - 1)));
    }

    #visiblePageNumbers() {
        const start = this.currentPage > 0 ? this.currentPage - 1 : 0;
        const end = this.currentPage > 0 ? this.currentPage + PAGE_WINDOW_SIZE : PAGE_WINDOW_SIZE;

        const pages = [];
        for (let page = start; page < end && page < this.totalPages; page++) {
            pages.push(page);
        }
        return pages;
    }

    #createPageButton(pageNumber) {
        const button = document.createElement('button');
        button.textContent = String(pageNumber + 1);
        button.disabled = pageNumber === this.currentPage;
        button.addEventListener('click', () => this.goToPage(pageNumber));
        return button;
    }

    #createNavButton(label, title, disabled, onClick) {
        const button = document.createElement('button');
        button.textContent = label;
        button.title = title;
        button.disabled = disabled;
        button.addEventListener('click', onClick);
        return button;
    }

    #appendToBothContainers(button) {
        this.topContainer.appendChild(button);
        this.bottomContainer.appendChild(button.cloneNode(true));
        const lastClone = this.bottomContainer.lastElementChild;
        lastClone.addEventListener('click', () => button.click());
    }
}

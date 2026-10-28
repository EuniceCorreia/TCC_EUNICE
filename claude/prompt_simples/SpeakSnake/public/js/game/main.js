import { GameController } from './game-controller.js';

/**
 * Ponto de entrada do jogo.
 */
document.addEventListener('DOMContentLoaded', () => {
    $(document).ready(() => {
        const game = new GameController();
        game.start();
    });
});

/**
 * Constantes do jogo.
 */

export const GRID_SIZE = 64;
export const GAME_TICK_MS = 300;
export const SNAKE_MOVE_STEP = GRID_SIZE;

export const BOARD_ROWS = 15;
export const BOARD_COLS = 20;

export const MICROPHONE_TIMEOUT_MS = 10000;
export const SPEECH_TIMEOUT_MS = 3000;
export const RESULT_DISPLAY_MS = 4000;
export const RETRY_DELAY_MS = 1500;
export const SKIP_TURN_DELAY_MS = 2000;

export const KEY_CODE = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
};

export const DIRECTION_ACTIVE_CLASS_DURATION_MS = 100;

/**
 * Pontuação concedida de acordo com as vidas restantes ao acertar a pronúncia
 */
export const SCORE_BY_REMAINING_LIVES = {
    3: 100,
    2: 50,
    1: 30,
    0: 10,
};

/**
 * Cor de cada indicador de vida, por número de vidas restantes
 */
export const LIVES_COLOR_BY_REMAINING = {
    3: { L1: 'rgb(0, 184, 0)', L2: 'rgb(0, 184, 0)', L3: 'rgb(0, 184, 0)' },
    2: { L1: 'rgb(255, 230, 1)', L2: 'rgb(255, 230, 1)', L3: 'rgb(255, 255, 255)' },
    1: { L1: 'rgb(255, 0, 0)', L2: 'rgb(255, 255, 255)', L3: 'rgb(255, 255, 255)' },
};

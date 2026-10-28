import {
    GRID_SIZE,
    GAME_TICK_MS,
    SNAKE_MOVE_STEP,
    BOARD_ROWS,
    BOARD_COLS,
    KEY_CODE,
    DIRECTION_ACTIVE_CLASS_DURATION_MS,
    SCORE_BY_REMAINING_LIVES,
    LIVES_COLOR_BY_REMAINING,
    RETRY_DELAY_MS,
    SKIP_TURN_DELAY_MS,
    RESULT_DISPLAY_MS,
} from './constants.js';
import { getCookie } from './cookies.js';
import { WordQueue } from './word-queue.js';
import { FoodImage } from './food-image.js';
import { SnakeRenderer } from './snake-renderer.js';
import { SpeechAnnouncer } from './speech-announcer.js';
import { SpeechRecognizer } from './speech-recognizer.js';
import { TimeoutCircle, SpeakCountdown } from './countdown.js';
import { GameApiClient } from './api-client.js';

/**
 * Controlador principal do jogo.
 */
export class GameController {
    constructor() {
        this.assetsPath = document.getElementById('assetsPath').value;
        this.activeUser = document.getElementById('nomeUsuario').value;
        this.countdownSound = new Audio(`${this.assetsPath}sfx/countdown.m4a`);
        this.countdownSound.volume = 0.2;

        this.imageFolder = getCookie('imgFolder');
        this.difficulty = getCookie('dificuldadeValue') ? 1 : 0;
        this.wordQueue = new WordQueue(JSON.parse(getCookie('filaPalavras')));

        this.foodImage = new FoodImage(`${this.assetsPath}imagens/${this.imageFolder}/icons/`);
        this.foodImage.setIndex(this.wordQueue.current.imgi);

        this.api = new GameApiClient();
        this.timeoutCircle = new TimeoutCircle();
        this.speakCountdown = new SpeakCountdown(this.countdownSound);
        this.speechAnnouncer = new SpeechAnnouncer();

        this.$score = $('#score');
        this.$pontosPalavra = $('#pontosPalavra');
        this.$imagemPalavra = $('#imagemPalavra');
        this.$hudImagemPalavra = $('#hudImagemPalavra');
        this.$palavraFalada = $('#palavraFalada');
        this.$numPalavras = $('#numPalavras');
        this.$numPontos = $('#numPontos');
        this.$mVitoria = $('#mVitoria');
        this.$mFala = $('#mFala');
        this.$mJogo = $('#wrapper');
        this.$mPontos = $('#mPontos');
        this.$directionButtons = {
            [KEY_CODE.UP]: $('#cima'),
            [KEY_CODE.DOWN]: $('#baixo'),
            [KEY_CODE.LEFT]: $('#esquerda'),
            [KEY_CODE.RIGHT]: $('#direita'),
        };

        this.lastDirectionKeyCode = KEY_CODE.LEFT;
        this.gamePaused = false;
        this.gameInterval = null;
        this.wordsCompletedCount = 0;
        this.totalAttemptsCount = 0;
        this.score = 0;

        this.playBoard = document.getElementById('play-board');
        this.ctx = this.playBoard.getContext('2d');
        this.playBoard.width = BOARD_COLS * GRID_SIZE;
        this.playBoard.height = BOARD_ROWS * GRID_SIZE;
        this.maxCols = Math.floor(this.playBoard.width / GRID_SIZE);
        this.maxRows = Math.floor(this.playBoard.height / GRID_SIZE);

        const centerX = Math.floor(BOARD_COLS / 2) * GRID_SIZE;
        const centerY = Math.floor(BOARD_ROWS / 2) * GRID_SIZE;
        this.snakeBody = [0, 1, 2, 3, 4].map((offset) => ({ x: centerX - GRID_SIZE * offset, y: centerY }));
        this.velocityX = SNAKE_MOVE_STEP;
        this.velocityY = 0;

        this.snakeRenderer = new SnakeRenderer(this.ctx, GRID_SIZE);

        this.recognizer = new SpeechRecognizer({
            onResult: (event) => this.handleRecognitionResult(event),
            onNoAudioDetected: () => this.handleNoAudioDetected(),
            onError: (event) => this.handleRecognitionError(event),
        });
    }

    start() {
        this.bindControls();
        this.changeFoodPosition();
        this.gameInterval = setInterval(() => this.updateCanvas(), GAME_TICK_MS);
        this.drawSnake();
    }

    bindControls() {
        document.addEventListener('keydown', (event) => this.changeDirection(event));

        Object.entries(this.$directionButtons).forEach(([keyCode, $button]) => {
            $button.on('click', () => this.changeDirection({ keyCode: Number(keyCode) }));
        });

        $('#listenBtn').click((event) => {
            event.preventDefault();
            this.recognizer.stop();
            this.wordQueue.increaseCurrentReplays();
            this.speakCurrentWord();
        });

        $('#finalizar').click(() => this.endGame());
        $('#endBtn').click(() => this.endGame());
        $('#pausar').click(() => this.togglePauseButton());
        $('#skipBtn').click(() => {
            this.wordQueue.moveCurrentToEnd();
            this.speakCurrentWord();
        });
    }

    // --- Ciclo de desenho -------------------------------------------------

    updateCanvas() {
        this.drawBackground();
        this.foodImage.draw(this.ctx, this.foodX, this.foodY, GRID_SIZE);
        this.drawSnake();
        this.advanceSnake();
        this.checkCollision();
    }

    drawBackground() {
        const { ctx } = this;
        ctx.clearRect(0, 0, this.playBoard.width, this.playBoard.height);
        for (let y = 0; y < BOARD_ROWS; y++) {
            for (let x = 0; x < BOARD_COLS; x++) {
                ctx.fillStyle = (x + y) % 2 === 0 ? '#1c4a32' : '#204f37';
                ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            }
        }
    }

    drawSnake() {
        this.changeSnakeDirection();
        this.snakeRenderer.draw(this.snakeBody);
    }

    // --- Movimento ----------------------------------------------------

    changeDirection(event) {
        this.lastDirectionKeyCode = event.keyCode;
        const $button = this.$directionButtons[event.keyCode];

        if (!$button) return;

        $button.addClass('direcao_active');
        setTimeout(() => $button.removeClass('direcao_active'), DIRECTION_ACTIVE_CLASS_DURATION_MS);

        if (event.keyCode === KEY_CODE.DOWN) {
            event.preventDefault?.();
        }
    }

    changeSnakeDirection() {
        const goingUp = this.velocityY === -SNAKE_MOVE_STEP;
        const goingDown = this.velocityY === SNAKE_MOVE_STEP;
        const goingRight = this.velocityX === SNAKE_MOVE_STEP;
        const goingLeft = this.velocityX === -SNAKE_MOVE_STEP;

        if (this.lastDirectionKeyCode === KEY_CODE.LEFT && !goingRight) {
            this.velocityX = -SNAKE_MOVE_STEP;
            this.velocityY = 0;
        } else if (this.lastDirectionKeyCode === KEY_CODE.UP && !goingDown) {
            this.velocityX = 0;
            this.velocityY = -SNAKE_MOVE_STEP;
        } else if (this.lastDirectionKeyCode === KEY_CODE.RIGHT && !goingLeft) {
            this.velocityX = SNAKE_MOVE_STEP;
            this.velocityY = 0;
        } else if (this.lastDirectionKeyCode === KEY_CODE.DOWN && !goingUp) {
            this.velocityX = 0;
            this.velocityY = SNAKE_MOVE_STEP;
        }
    }

    advanceSnake() {
        const head = this.snakeBody[0];
        const newX = head.x + this.velocityX;
        const newY = head.y + this.velocityY;
        const reachedNextCell = (this.velocityX !== 0 && newX % GRID_SIZE === 0) || (this.velocityY !== 0 && newY % GRID_SIZE === 0);

        if (!reachedNextCell) {
            head.x = newX;
            head.y = newY;
            return;
        }

        this.snakeBody.unshift({ x: newX, y: newY });

        if (newX === this.foodX && newY === this.foodY) {
            this.changeFoodPosition();
            this.gamePaused = true;
            setTimeout(() => this.speakCurrentWord(), GAME_TICK_MS * 2);
        } else {
            this.snakeBody.pop();
        }
    }

    checkCollision() {
        const head = this.snakeBody[0];

        if (head.x >= this.playBoard.width) head.x = 0;
        if (head.x < 0) head.x = this.playBoard.width - GRID_SIZE;
        if (head.y >= this.playBoard.height) head.y = 0;
        if (head.y < 0) head.y = this.playBoard.height - GRID_SIZE;

        const bitSelf = this.snakeBody.slice(1).some((part) => part.x === head.x && part.y === head.y);
        if (bitSelf) {
            this.endGame();
        }
    }

    // --- Comida -------------------------------------------------------

    changeFoodPosition() {
        this.foodX = this.#randomCellCoordinate(this.maxCols);
        this.foodY = this.#randomCellCoordinate(this.maxRows);

        if (this.wordQueue.current?.imgi !== undefined) {
            this.foodImage.setIndex(this.wordQueue.current.imgi);
        }

        while (this.snakeBody.some((part) => part.x === this.foodX && part.y === this.foodY)) {
            this.foodX = this.#randomCellCoordinate(this.maxCols);
            this.foodY = this.#randomCellCoordinate(this.maxRows);
        }

        this.foodImage.markAsPending();
    }

    #randomCellCoordinate(maxCells) {
        const range = maxCells;
        const maxUint32 = 0xffffffff;
        const maxAcceptable = maxUint32 - ((maxUint32 + 1) % range);
        const randomBuffer = new Uint32Array(1);

        let randomValue;
        do {
            crypto.getRandomValues(randomBuffer);
            randomValue = randomBuffer[0];
        } while (randomValue > maxAcceptable);

        return (randomValue % range) * GRID_SIZE;
    }

    // --- Fluxo de fala / pontuação --------------------------------------

    async speakCurrentWord() {
        this.togglePause();

        const { palavra: word, imgi: imageIndex } = this.wordQueue.current;
        const imageSrc = `${this.assetsPath}imagens/${this.imageFolder}/${imageIndex}.jpg`;

        this.recognizer.stop();
        this.timeoutCircle.stop();

        this.updateLivesDisplay();
        document.getElementById('palavra').textContent = word.toUpperCase();
        document.getElementById('imagemPalavra').src = imageSrc;
        this.$palavraFalada.text('________');

        try {
            await this.speechAnnouncer.announce(`Fale ${word}`, () => {
                this.speakCountdown.start(() => {
                    this.recognizer.start();
                    this.timeoutCircle.start(10000);
                });
            });
        } catch (error) {
            console.warn('Erro ao falar palavra:', error);
            this.speakCountdown.start(() => {
                this.recognizer.start();
                this.timeoutCircle.start(10000);
            });
        }
    }

    handleRecognitionResult(event) {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript.toLowerCase().replaceAll('.', '');
        const words = transcript.split(' ');

        this.showSpokenWords(words.join(' '));

        if (!event.results[resultIndex].isFinal) {
            return;
        }

        if (words[0] === this.wordQueue.current.palavra) {
            this.handleCorrectPronunciation();
        } else {
            this.handleWrongPronunciation();
        }
    }

    handleRecognitionError(event) {
        console.log(`Error: ${event.error}`);
        this.showSpokenWords('_ _ _ _ _ _ _ _');
        this.timeoutCircle.stop();
    }

    handleNoAudioDetected() {
        if (!this.timeoutCircle.isRunning) return;
        this.recognizer.start();
    }

    showSpokenWords(text) {
        const gifElement = document.getElementById('gifFalando');
        const wordElement = document.getElementById('palavraFalada');
        gifElement.style.display = 'none';
        wordElement.style.display = 'inline';

        try {
            wordElement.textContent = text.toUpperCase();
        } catch (error) {
            console.error('Erro ao exibir a palavra reconhecida:', error);
        }
    }

    async handleCorrectPronunciation() {
        const earnedPoints = SCORE_BY_REMAINING_LIVES[this.wordQueue.current.vidas] ?? 0;
        this.score += earnedPoints;

        await this.api.saveWordAttempt({
            userName: this.activeUser,
            word: this.wordQueue.current.palavra,
            difficulty: this.difficulty,
            attempts: this.wordQueue.current.tentativas,
        });

        this.$score.text(`Pontos: ${this.score}`);
        this.snakeBody.push({ x: this.foodX, y: this.foodY });

        this.wordQueue.advanceAfterCorrectAnswer();
        this.wordsCompletedCount++;
        this.totalAttemptsCount += this.wordQueue.current.tentativas;

        this.changeFoodPosition();
        this.$hudImagemPalavra.css('display', 'none');
        this.$mFala.css('display', 'none');
        this.$pontosPalavra.text(earnedPoints);

        const color = this.updateLivesDisplay();
        this.$pontosPalavra.css('color', color);

        this.$mPontos.css('display', 'flex');
        setTimeout(() => {
            this.$mPontos.css('display', 'none');
            this.gamePaused = false;
            this.togglePause();
        }, RESULT_DISPLAY_MS);
    }

    handleWrongPronunciation() {
        const remainingLives = this.wordQueue.decreaseCurrentLife();

        if (remainingLives > 0) {
            this.wordQueue.increaseCurrentAttempts();
            this.updateLivesDisplay();
            setTimeout(() => this.speakCurrentWord(), RETRY_DELAY_MS);
            return;
        }

        this.wordQueue.moveCurrentToEnd();
        this.changeFoodPosition();
        this.gamePaused = false;
        setTimeout(() => this.togglePause(), SKIP_TURN_DELAY_MS);
    }

    updateLivesDisplay() {
        const colors = LIVES_COLOR_BY_REMAINING[this.wordQueue.current.vidas];
        if (!colors) return '';

        document.getElementById('L1').style.color = colors.L1;
        document.getElementById('L2').style.color = colors.L2;
        document.getElementById('L3').style.color = colors.L3;

        return colors.L1;
    }

    // --- Pausa / fim de jogo --------------------------------------------

    togglePauseButton() {
        this.gamePaused = !this.gamePaused;

        if (this.gamePaused) {
            clearInterval(this.gameInterval);
        } else {
            this.gameInterval = setInterval(() => this.updateCanvas(), GAME_TICK_MS);
        }

        this.updatePauseButtonLabel();
    }

    updatePauseButtonLabel() {
        const $pausar = $('#pausar');
        $pausar.text(this.gamePaused ? 'Retomar' : 'Pausar');
        $pausar.toggleClass('pausar--retomar', this.gamePaused);
    }

    togglePause() {
        if (this.gamePaused) {
            clearInterval(this.gameInterval);
            this.$mJogo.css('display', 'none');
            this.$mFala.css('display', 'flex');
            this.$imagemPalavra.css('display', 'inline');
            this.$hudImagemPalavra.css('display', 'inline');
        } else {
            this.$mFala.css('display', 'none');
            this.$imagemPalavra.css('display', 'none');
            this.$hudImagemPalavra.css('display', 'none');
            this.$mJogo.css('display', 'flex');
            this.gameInterval = setInterval(() => this.updateCanvas(), GAME_TICK_MS);
            this.drawBackground();
            this.foodImage.draw(this.ctx, this.foodX, this.foodY, GRID_SIZE);
            this.drawSnake();
        }

        this.updatePauseButtonLabel();
    }

    async endGame() {
        clearInterval(this.gameInterval);
        this.gameInterval = null;

        this.$mJogo.css('display', 'none');
        this.$mFala.css('display', 'none');
        this.$mVitoria.css('display', 'flex');
        this.$imagemPalavra.css('display', 'none');
        this.$hudImagemPalavra.css('display', 'none');

        this.$numPalavras.text(this.wordsCompletedCount);
        this.$numPontos.text(this.score);

        await this.api.saveFinalScore({
            userName: this.activeUser,
            wordsCount: this.wordsCompletedCount,
            attemptsCount: this.totalAttemptsCount,
            score: this.score,
        });
    }
}
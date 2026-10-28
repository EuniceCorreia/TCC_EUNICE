/**
 * Círculo de contagem regressiva do tempo de resposta (microfone).
 */
export class TimeoutCircle {
    constructor() {
        this.container = document.querySelector('.countdown-container');
        this.circle = document.querySelector('.progress');
        this.text = document.getElementById('countdownText');
        this.radius = 54;
        this.circumference = 2 * Math.PI * this.radius;
        this.timerHandle = null;
        this.isRunning = false;
    }

    start(durationMs) {
        if (this.timerHandle) clearInterval(this.timerHandle);

        this.isRunning = true;
        this.container.style.display = 'inline';
        this.circle.style.strokeDasharray = this.circumference;
        this.circle.style.strokeDashoffset = 0;

        const startTime = Date.now();

        this.timerHandle = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = durationMs - elapsed;

            this.text.textContent = Math.ceil(remaining / 1000);
            this.circle.style.strokeDashoffset = (elapsed / durationMs) * this.circumference;

            if (remaining <= 0) {
                this.#finish();
            }
        }, 100);
    }

    stop() {
        this.isRunning = false;
        if (this.timerHandle) {
            clearInterval(this.timerHandle);
            this.timerHandle = null;
        }
        this.container.style.display = 'none';
    }

    #finish() {
        this.isRunning = false;
        clearInterval(this.timerHandle);
        this.timerHandle = null;
        this.circle.style.strokeDashoffset = this.circumference;
        this.text.textContent = '0';
    }
}

/**
 * Contagem regressiva de 3-2-1 exibida antes de escutar o jogador.
 * Extraído de countdown() (Extract Class).
 */
export class SpeakCountdown {
    constructor(sound) {
        this.sound = sound;
        this.textElement = document.getElementById('palavraFalada');
        this.gifElement = document.getElementById('gifFalando');
        this.intervalHandle = null;
    }

    start(onFinish) {
        this.onFinish = onFinish;
        this.gifElement.style.display = 'none';
        this.textElement.style.display = 'inline';

        if (this.intervalHandle) clearInterval(this.intervalHandle);

        let count = 3;
        this.textElement.textContent = count;

        this.intervalHandle = setInterval(() => {
            count--;

            if (count > 0) {
                if (count === 2) {
                    this.sound.currentTime = 0;
                    this.sound.play();
                }
                this.textElement.textContent = count;
            } else {
                this.#finish();
            }
        }, 1000);
    }

    #finish() {
        clearInterval(this.intervalHandle);
        this.intervalHandle = null;
        this.textElement.textContent = '________';
        this.textElement.style.display = 'none';
        this.gifElement.style.display = 'inline';
        this.onFinish?.();
        this.onFinish = null;
    }
}
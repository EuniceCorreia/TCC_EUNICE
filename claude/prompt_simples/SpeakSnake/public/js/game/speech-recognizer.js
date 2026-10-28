import { MICROPHONE_TIMEOUT_MS } from './constants.js';

/**
 * Encapsula o reconhecimento de voz do navegador.
 */
export class SpeechRecognizer {
    constructor({ onResult, onNoAudioDetected, onError }) {
        const SpeechRecognitionApi = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
        this.recognition = new SpeechRecognitionApi();
        this.recognition.continuous = false;
        this.recognition.lang = 'pt-br';
        this.recognition.interimResults = false;

        this.isActive = false;
        this.timeoutHandle = null;

        this.recognition.onstart = () => {
            this.isActive = true;
            clearTimeout(this.timeoutHandle);
        };

        this.recognition.onend = () => {
            this.isActive = false;
            clearTimeout(this.timeoutHandle);
            onNoAudioDetected?.();
        };

        this.recognition.onerror = (event) => {
            onError?.(event);
        };

        this.recognition.onresult = (event) => {
            onResult?.(event);
        };
    }

    start() {
        if (this.isActive) {
            console.log('Reconhecimento já está ativo, não é possível iniciar novamente.');
            return;
        }

        // Nunca inicia o microfone enquanto o narrador ainda está
        // falando a palavra: evita que a criança "ganhe" apenas
        // esperando o áudio do jogo em vez de falar de fato.
        if (globalThis.speechSynthesis?.speaking) {
            globalThis.speechSynthesis.addEventListener(
                'end',
                () => this.start(),
                { once: true }
            );
            return;
        }

        this.recognition.start();
        this.timeoutHandle = setTimeout(() => {
            this.recognition.stop();
            console.log('Nenhuma entrada de áudio detectada.');
        }, MICROPHONE_TIMEOUT_MS);
    }

    stop() {
        this.recognition.stop();
    }
}
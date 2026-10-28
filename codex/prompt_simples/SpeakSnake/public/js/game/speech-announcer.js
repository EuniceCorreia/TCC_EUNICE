import { SPEECH_TIMEOUT_MS } from './constants.js';

/**
 * Encapsula a síntese de fala (falar a palavra em voz alta).
 */
export class SpeechAnnouncer {
    constructor() {
        this.utterance = new SpeechSynthesisUtterance();
        const voices = globalThis.speechSynthesis.getVoices();
        this.utterance.voice = voices[10];
        this.utterance.voiceURI = 'native';
        this.utterance.volume = 1;
        this.utterance.rate = 0.7;
        this.utterance.pitch = 2;
        this.utterance.lang = 'pt-BR';

        this.timeoutHandle = null;
    }

    announce(text, onCountdownStart) {
        this.utterance.text = text;

        return new Promise((resolve, reject) => {
            if (this.timeoutHandle) clearTimeout(this.timeoutHandle);

            this.timeoutHandle = setTimeout(() => {
                if (speechSynthesis.speaking) {
                    speechSynthesis.cancel();
                    reject(new Error('Timeout: fala interrompida.'));
                }
            }, SPEECH_TIMEOUT_MS);

            this.utterance.onend = () => {
                clearTimeout(this.timeoutHandle);
                this.timeoutHandle = null;
                onCountdownStart?.();
                resolve('Fala concluída.');
            };

            this.utterance.onerror = (event) => {
                clearTimeout(this.timeoutHandle);
                this.timeoutHandle = null;
                reject(new Error(`Erro no speech: ${event.error}`));
            };

            speechSynthesis.speak(this.utterance);
        });
    }
}
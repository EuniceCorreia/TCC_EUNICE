/**
 * Encapsula a fila de palavras do jogo.
 */
export class WordQueue {
    constructor(words) {
        this.items = WordQueue.#buildShuffledEntries(words);
    }

    static #buildShuffledEntries(words) {
        const entries = words.map((word, index) => ({
            palavra: word,
            vidas: 3,
            tentativas: 1,
            reproducoes: 0,
            imgi: index,
        }));

        return entries.sort(() => Math.random() - 0.5);
    }

    get current() {
        return this.items[0];
    }

    decreaseCurrentLife() {
        this.current.vidas--;
        return this.current.vidas;
    }

    increaseCurrentAttempts() {
        this.current.tentativas++;
    }

    increaseCurrentReplays() {
        this.current.reproducoes++;
    }

    /** Remove a palavra atual (respondida corretamente). */
    advanceAfterCorrectAnswer() {
        this.items.shift();
    }

    /** Move a palavra atual para o final da fila (sem vidas ou pulada). */
    moveCurrentToEnd() {
        this.items.push(this.items.shift());
    }

    get isEmpty() {
        return this.items.length === 0;
    }
}

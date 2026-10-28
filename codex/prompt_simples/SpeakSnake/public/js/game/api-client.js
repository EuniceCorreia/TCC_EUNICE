/**
 * Cliente das chamadas AJAX do jogo.
 */
export class GameApiClient {
    async saveWordAttempt({ userName, word, difficulty, attempts }) {
        return this.#post('api/save-word-attempt.php', {
            nome: userName,
            palavra: word,
            dificuldade: difficulty,
            tentativas: attempts,
        });
    }

    async saveFinalScore({ userName, wordsCount, attemptsCount, score }) {
        return this.#post('api/save-score.php', {
            nome: userName,
            palavras: wordsCount,
            tentativas: attemptsCount,
            pontuacao: score,
        });
    }

    async #post(url, data) {
        try {
            const response = await $.ajax({ type: 'POST', url, data });
            console.log('Data sent to the database successfully!', response);
            return response;
        } catch (error) {
            console.error('Error occurred while sending data to the database:', error);
            throw error;
        }
    }
}

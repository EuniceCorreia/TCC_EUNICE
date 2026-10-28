/**
 * Ordenação e filtragem dos dados de estatísticas.
 */

const COMPARATORS = {
    id: (a, b) => a.id - b.id,
    nome: (a, b) => a.nome.localeCompare(b.nome),
    pontuacao: (a, b) => b.pontuacao - a.pontuacao,
    palavras: (a, b) => b.palavras - a.palavras,
    tentativas: (a, b) => b.tentativas - a.tentativas,
};

const FILTER_FIELDS = new Set(['nome', 'pontuacao', 'palavras', 'tentativas']);

export function sortScores(scores, sortKey) {
    const comparator = COMPARATORS[sortKey] ?? COMPARATORS.pontuacao;
    return [...scores].sort(comparator);
}

export function filterScores(scores, fieldName, searchTerm) {
    if (!FILTER_FIELDS.has(fieldName) || searchTerm === '') {
        return [...scores];
    }

    const normalizedTerm = searchTerm.toLowerCase();

    return scores.filter((row) => String(row[fieldName]).toLowerCase().includes(normalizedTerm));
}

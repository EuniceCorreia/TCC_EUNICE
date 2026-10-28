/**
 * Catálogo de palavras por tema e dificuldade.
 */

export const Theme = {
    SUSTAINABILITY: '1',
    FINANCIAL_EDUCATION: '2',
    HEALTHY_EATING: '3',
};

export const Difficulty = {
    EASY: 'true',
    HARD: 'false',
};

const WORDS_BY_THEME_AND_DIFFICULTY = {
    [Theme.HEALTHY_EATING]: {
        [Difficulty.EASY]: ['arroz', 'aveia', 'banana', 'carne', 'chá', 'couve', 'leite', 'maçã', 'mel', 'milho', 'ovo', 'pão', 'peixe', 'sal', 'tomate'],
        [Difficulty.HARD]: ['abacaxi', 'açaí', 'acerola', 'amêndoa', 'brócolis', 'camarão', 'espinafre', 'guaraná', 'jabuticaba', 'lentilha', 'pinhão', 'pitaia', 'quiabo', 'romã', 'rúcula'],
    },
    [Theme.SUSTAINABILITY]: {
        [Difficulty.EASY]: ['água', 'alimento', 'chuva', 'coleta', 'doar', 'energia', 'eólica', 'luz', 'metal', 'papel', 'plástico', 'recurso', 'seletiva', 'solar', 'vidro'],
        [Difficulty.HARD]: ['agricultura', 'alimentação', 'biocombustível', 'compostagem', 'econômico', 'eletricidade', 'híbrido', 'insumos ', 'orgânico', 'reciclável', 'reciclagem', 'renovável', 'responsabilidade', 'sustentável', 'tecnológico'],
    },
    [Theme.FINANCIAL_EDUCATION]: {
        [Difficulty.EASY]: ['bens', 'comprar', 'dinheiro', 'economia', 'gasto', 'mercado', 'moeda', 'ouro', 'poupar', 'preço', 'produto', 'renda', 'reuso', 'valor', 'venda'],
        [Difficulty.HARD]: ['cédula', 'despesa', 'empréstimo', 'escambo', 'impostos', 'investimento', 'monetário', 'pix', 'propaganda', 'publicidade', 'público', 'salário', 'serviços', 'suprimento', 'trabalho'],
    },
};

const IMAGE_FOLDER_BY_THEME_AND_DIFFICULTY = {
    [Theme.HEALTHY_EATING]: { [Difficulty.EASY]: 'AF', [Difficulty.HARD]: 'AD' },
    [Theme.SUSTAINABILITY]: { [Difficulty.EASY]: 'SF', [Difficulty.HARD]: 'SD' },
    [Theme.FINANCIAL_EDUCATION]: { [Difficulty.EASY]: 'FF', [Difficulty.HARD]: 'FD' },
};

export function wordsFor(theme, difficulty) {
    return WORDS_BY_THEME_AND_DIFFICULTY[theme]?.[difficulty] ?? WORDS_BY_THEME_AND_DIFFICULTY[Theme.SUSTAINABILITY][Difficulty.EASY];
}

export function imageFolderFor(theme, difficulty) {
    return IMAGE_FOLDER_BY_THEME_AND_DIFFICULTY[theme]?.[difficulty] ?? IMAGE_FOLDER_BY_THEME_AND_DIFFICULTY[Theme.SUSTAINABILITY][Difficulty.EASY];
}

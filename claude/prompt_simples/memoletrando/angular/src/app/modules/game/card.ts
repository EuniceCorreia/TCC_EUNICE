export interface Card {
  id: string;
  img: string;
  pairId: string;
  word: string;
}

export interface CardPair {
  img: string;
  word: string;
}

/** Gera duas cartas para cada par, com ids sequenciais (`card1`, `card2`, ...). */
export function buildCards(pairs: readonly CardPair[]): Card[] {
  return pairs.flatMap((pair, index) => {
    const pairId = String(index + 1);
    return [1, 2].map(copy => ({
      id: `card${index * 2 + copy}`,
      img: pair.img,
      pairId,
      word: pair.word,
    }));
  });
}

export interface MemoryCard {
  id: string;
  img: string;
  par: string;
  word: string;
}

const DEFAULT_FIGURES = [
  { img: 'orca.webp', word: 'baleia' },
  { img: 'peixe.jpeg', word: 'peixe' },
  { img: 'tubarao.jpg', word: 'tubarao' },
  { img: 'tataruga.jpeg', word: 'tartaruga' }
];

export function createDefaultCards(): MemoryCard[] {
  return DEFAULT_FIGURES.flatMap((figure, index) =>
    [0, 1].map(copy => ({
      id: `card${index * 2 + copy + 1}`,
      img: `../../../assets/image/${figure.img}`,
      par: String(index + 1),
      word: figure.word
    }))
  );
}

export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError('Row size must be a positive integer');
  }
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}

export type CardSelection = 'ignored' | 'flipped' | 'unflipped' | 'match' | 'mismatch';

/** Pair selection rules, independent of Angular, dialogs and audio. */
export class MemoryGame {
  private selected: MemoryCard[] = [];
  private matched: MemoryCard[] = [];

  constructor(readonly cards: readonly MemoryCard[]) {}

  get selectedCards(): readonly MemoryCard[] { return this.selected; }
  get matchedCards(): readonly MemoryCard[] { return this.matched; }
  get complete(): boolean { return this.cards.length > 0 && this.matched.length === this.cards.length; }

  select(card: MemoryCard): CardSelection {
    if (!this.cards.includes(card) || this.matched.includes(card) || this.selected.length === 2) {
      return 'ignored';
    }
    if (this.selected.includes(card)) {
      this.selected = [];
      return 'unflipped';
    }
    this.selected.push(card);
    if (this.selected.length < 2) {
      return 'flipped';
    }
    if (this.selected[0].par !== this.selected[1].par) {
      return 'mismatch';
    }
    this.matched.push(...this.selected);
    return 'match';
  }

  finishTurn(): void {
    this.selected = [];
  }
}

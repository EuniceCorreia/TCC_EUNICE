import { chunk, createDefaultCards, MemoryGame, shuffle } from './memory-game';

describe('MemoryGame', () => {
  const cards = createDefaultCards();
  let game: MemoryGame;

  beforeEach(() => { game = new MemoryGame(cards); });

  it('creates four pairs with unique card IDs', () => {
    expect(cards.length).toBe(8);
    expect(new Set(cards.map(card => card.id)).size).toBe(8);
    for (const pair of new Set(cards.map(card => card.par))) {
      const matches = cards.filter(card => card.par === pair);
      expect(matches.length).toBe(2);
      expect(matches[0].word).toBe(matches[1].word);
      expect(matches[0].img).toBe(matches[1].img);
    }
  });

  it('turns a selected card back without matching it with itself', () => {
    expect(game.select(cards[0])).toBe('flipped');
    expect(game.select(cards[0])).toBe('unflipped');
    expect(game.selectedCards).toEqual([]);
    expect(game.matchedCards).toEqual([]);
  });

  it('locks a resolved turn and ignores already matched cards', () => {
    game.select(cards[0]);
    expect(game.select(cards[1])).toBe('match');
    expect(game.select(cards[2])).toBe('ignored');
    game.finishTurn();
    expect(game.select(cards[0])).toBe('ignored');
    expect(game.matchedCards.length).toBe(2);
  });

  it('allows mismatched cards to be selected again on the next turn', () => {
    game.select(cards[0]);
    expect(game.select(cards[2])).toBe('mismatch');
    expect(game.matchedCards).toEqual([]);
    game.finishTurn();
    expect(game.select(cards[0])).toBe('flipped');
    expect(game.select(cards[1])).toBe('match');
  });

  it('completes only after all pairs have been found', () => {
    expect(game.complete).toBeFalse();
    for (let index = 0; index < cards.length; index += 2) {
      game.select(cards[index]);
      game.select(cards[index + 1]);
      game.finishTurn();
    }
    expect(game.complete).toBeTrue();
    expect(new MemoryGame([]).complete).toBeFalse();
  });

  it('ignores cards outside this game', () => {
    expect(game.select({ ...cards[0], id: 'foreign' })).toBe('ignored');
    expect(game.selectedCards).toEqual([]);
  });

  it('shuffles without mutating or losing cards', () => {
    const original = [...cards];
    const result = shuffle(cards, () => 0);
    expect(cards).toEqual(original);
    expect(result).not.toEqual(original);
    expect(new Set(result)).toEqual(new Set(original));
  });

  it('groups cards in rows, including a partial last row', () => {
    expect(chunk(cards, 4).map(row => row.length)).toEqual([4, 4]);
    expect(chunk(cards, 3).map(row => row.length)).toEqual([3, 3, 2]);
    expect(chunk([], 4)).toEqual([]);
    expect(() => chunk(cards, 0)).toThrowError(RangeError);
  });
});

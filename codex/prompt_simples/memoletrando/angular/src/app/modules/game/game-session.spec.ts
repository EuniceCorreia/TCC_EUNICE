import { GameSession } from './game-session';

describe('GameSession', () => {
  it('uses one start time for minutes, seconds and three-digit milliseconds', () => {
    let now = 1000;
    const session = new GameSession(() => now);
    expect(session.time).toEqual({ minutes: '00', seconds: '00', milliseconds: '000' });
    now += 61234;
    expect(session.time).toEqual({ minutes: '01', seconds: '01', milliseconds: '234' });
  });

  it('records independent time snapshots in one chronological log', () => {
    let now = 0;
    const session = new GameSession(() => now);
    session.record('initGame', 'none');
    now = 10;
    session.record('insert_text');
    expect(session.events.map(event => event.type)).toEqual(['initGame', 'insert_text']);
    expect(session.events[0].time.milliseconds).toBe('000');
    expect(session.events[1].time.milliseconds).toBe('010');
    expect(session.events[0].peripheral).toBe('none');
    expect(session.events[1].peripheral).toBe('mouse');
  });

  it('keeps separate games isolated', () => {
    const first = new GameSession();
    const second = new GameSession();
    first.record('hit');
    expect(second.events).toEqual([]);
  });
});

export interface GameTime {
  minutes: string;
  seconds: string;
  milliseconds: string;
}

export type PlayEventType = 'initGame' | 'toFlipCard' | 'toFlipBackOverCard' |
  'hit' | 'error' | 'delete_text' | 'verify_text' | 'insert_text' | 'valid_play' | 'error_play';

export interface PlayEvent {
  type: PlayEventType;
  time: { minute: string; seconds: string; milliseconds: string };
  peripheral: 'mouse' | 'none';
}

/** A single clock and event log shared explicitly with the spelling modal. */
export class GameSession {
  private readonly startedAt: number;
  private readonly recordedEvents: PlayEvent[] = [];

  constructor(private readonly now: () => number = Date.now) {
    this.startedAt = now();
  }

  get time(): GameTime {
    const elapsed = Math.max(0, this.now() - this.startedAt);
    return {
      minutes: String(Math.floor(elapsed / 60000)).padStart(2, '0'),
      seconds: String(Math.floor(elapsed % 60000 / 1000)).padStart(2, '0'),
      milliseconds: String(elapsed % 1000).padStart(3, '0')
    };
  }

  get events(): readonly PlayEvent[] { return this.recordedEvents; }

  record(type: PlayEventType, peripheral: 'mouse' | 'none' = 'mouse'): void {
    const time = this.time;
    this.recordedEvents.push({
      type,
      time: { minute: time.minutes, seconds: time.seconds, milliseconds: time.milliseconds },
      peripheral
    });
  }
}

import { GameTimer } from './game-timer';

export type GameEventType =
  // Jogo da memória
  | 'initGame'
  | 'toFlipCard'
  | 'toFlipBackOverCard'
  | 'hit'
  | 'error'
  // Modal de escrita da palavra
  | 'insert_text'
  | 'delete_text'
  | 'verify_text'
  | 'valid_play'
  | 'error_play';

export type Peripheral = 'mouse' | 'none';

export interface RecordedGameEvent {
  type: GameEventType;
  time: {
    minute: string;
    seconds: string;
    milliseconds: string;
  };
  peripheral: Peripheral;
}

/**
 * Estado compartilhado de uma partida: o cronômetro e os eventos registrados.
 * É criado pelo GameComponent e repassado ao ModalGameComponent.
 */
export class GameSession {
  readonly timer = new GameTimer();
  private readonly recordedEvents: RecordedGameEvent[] = [];

  get events(): readonly RecordedGameEvent[] {
    return this.recordedEvents;
  }

  record(type: GameEventType, peripheral: Peripheral = 'mouse'): void {
    const { minutes, seconds, milliseconds } = this.timer.time;
    this.recordedEvents.push({
      type,
      time: { minute: minutes, seconds, milliseconds },
      peripheral,
    });
  }
}

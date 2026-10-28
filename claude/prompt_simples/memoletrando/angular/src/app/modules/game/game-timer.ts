export interface GameTime {
  minutes: string;
  seconds: string;
  milliseconds: string;
}

const TICK_INTERVAL_MS = 10;

function pad(value: number): string {
  return ('0' + Math.floor(value)).slice(-2);
}

/** Cronômetro da partida, atualizado a cada `TICK_INTERVAL_MS`. */
export class GameTimer {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  time: GameTime = { minutes: '00', seconds: '00', milliseconds: '000' };

  start(startTime: number = Date.now()): void {
    this.stop();
    this.intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      this.time = {
        minutes: pad(elapsed / 60000),
        seconds: pad((elapsed % 60000) / 1000),
        milliseconds: pad(elapsed % 1000),
      };
    }, TICK_INTERVAL_MS);
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

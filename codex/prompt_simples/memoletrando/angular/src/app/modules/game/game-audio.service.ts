import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameAudioService {
  play(folder: string, sound: string): void {
    const audio = new Audio(`assets/audio/${folder}/${sound.toLowerCase()}.mp3`);
    // Browsers may reject playback before the first user interaction.
    void audio.play().catch(() => undefined);
  }
}

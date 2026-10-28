import { Injectable } from '@angular/core';

/** Pastas disponíveis em `src/assets/audio`. */
export type SoundFolder = 'efects' | 'letters' | 'voices/positive' | 'voices/incentive';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  /** Toca `assets/audio/<folder>/<sound>.mp3`. A promise resolve quando a reprodução começa. */
  play(folder: SoundFolder, sound: string): Promise<void> {
    const audio = new Audio(`assets/audio/${folder}/${sound.toLowerCase()}.mp3`);
    return audio.play();
  }
}

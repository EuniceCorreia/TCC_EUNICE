import { Component, EventEmitter, Output } from '@angular/core';
import { SoundService } from 'src/app/shared/sound.service';

export const KEY_BACKSPACE = 'BackSpace';
export const KEY_ENTER = 'Enter';

/** Classes definidas em keyboard-button.component.css */
export type KeyHighlight = 'green-button' | 'red-button' | 'blue-button' | 'blink';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.css']
})
export class VirtualKeyboardComponent {
  @Output() letterClick = new EventEmitter<string>();

  readonly keyboardRows: readonly string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', KEY_BACKSPACE],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', KEY_ENTER]
  ];

  highlights: Partial<Record<string, KeyHighlight[]>> = {};

  constructor(private sound_service: SoundService) {}

  onButtonClick(key: string) {
    this.playKeySound(key);
    this.letterClick.emit(key);
  }

  highlight(key: string, ...classes: KeyHighlight[]) {
    this.highlights[key] = [...(this.highlights[key] ?? []), ...classes];
  }

  clearHighlights() {
    this.highlights = {};
  }

  private playKeySound(key: string) {
    const fileName = key === 'Ç' ? 'c_cidilha' : key;
    this.sound_service.play('letters', `letter_${fileName}`);
  }
}

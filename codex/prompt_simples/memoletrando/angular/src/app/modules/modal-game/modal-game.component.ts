import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';
import { GameSession } from '../game/game-session';
import { GameAudioService } from '../game/game-audio.service';

@Component({
  selector: 'app-modal-game',
  templateUrl: './modal-game.component.html',
  styleUrls: ['./modal-game.component.css']
})
export class ModalGameComponent implements AfterViewInit {
  @ViewChild(VirtualKeyboardComponent) virtualKeyboardComponent?: VirtualKeyboardComponent;
  @ViewChild('textResponse') textResponse?: ElementRef<HTMLInputElement>;

  readonly onClose = new EventEmitter<void>();
  // Supplied by the caller in the modal's initialState.
  session!: GameSession;
  virtualKeyboard = true;
  word = '';
  image = '';
  text = '';

  constructor(public modalRef: BsModalRef, private readonly audio: GameAudioService) {}

  ngAfterViewInit(): void {
    this.textResponse?.nativeElement.focus();
  }

  closeModal(): void {
    this.modalRef.hide();
    this.onClose.emit();
    this.onClose.complete();
  }

  onLetterClick(letter: string): void {
    switch (letter) {
      case 'BackSpace':
        this.session.record('delete_text');
        this.text = this.text.slice(0, -1);
        break;
      case 'Enter':
        this.session.record('verify_text');
        this.validatePlay();
        break;
      default:
        this.session.record('insert_text');
        this.text += letter;
    }
  }

  validatePlay(): void {
    this.virtualKeyboardComponent?.removeButtonsColors();
    if (this.word.toLowerCase() === this.text.toLowerCase()) {
      this.session.record('valid_play');
      this.closeModal();
    } else {
      this.session.record('error_play');
      this.colorButtons();
      this.audio.play('voices/incentive', 'ops_foi_quase');
    }
    this.text = '';
  }

  private colorButtons(): void {
    const word = this.word.toUpperCase();
    const text = this.text.toUpperCase();
    for (const letter of text) {
      this.virtualKeyboardComponent?.coloredButton(
        `#letter_${letter}`, word.includes(letter) ? 'green-button' : 'red-button'
      );
    }
    for (const letter of word) {
      if (!text.includes(letter)) {
        this.virtualKeyboardComponent?.coloredButton(`#letter_${letter}`, 'blue-button');
        this.virtualKeyboardComponent?.coloredButton(`#letter_${letter}`, 'blink');
      }
    }
  }
}

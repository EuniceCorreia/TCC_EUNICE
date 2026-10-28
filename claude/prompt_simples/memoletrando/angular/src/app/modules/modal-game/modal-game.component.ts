import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SoundService } from 'src/app/shared/sound.service';
import { GameSession } from '../game/game-session';
import { KEY_BACKSPACE, KEY_ENTER, VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';

/** Modal em que o jogador escreve a palavra da figura encontrada. */
@Component({
  selector: 'app-modal-game',
  templateUrl: './modal-game.component.html',
  styleUrls: ['./modal-game.component.css']
})
export class ModalGameComponent implements AfterViewInit {
  @ViewChild(VirtualKeyboardComponent) virtualKeyboardComponent?: VirtualKeyboardComponent;
  @ViewChild('textResponse') textResponse!: ElementRef<HTMLInputElement>;

  /** Emitido quando a palavra é escrita corretamente. */
  readonly solved = new EventEmitter<void>();

  // Preenchidos via `initialState` do BsModalService
  session!: GameSession;
  word: string = '';
  image: string = '';
  virtualKeyboard: boolean = false;

  text: string = '';

  constructor(private modalRef: BsModalRef, private sound_service: SoundService) {}

  ngAfterViewInit() {
    this.textResponse.nativeElement.focus();
  }

  onLetterClick(key: string) {
    switch (key) {
      case KEY_BACKSPACE:
        this.session.record('delete_text');
        this.text = this.text.slice(0, -1);
        break;
      case KEY_ENTER:
        this.session.record('verify_text');
        this.checkAnswer();
        break;
      default:
        this.session.record('insert_text');
        this.text += key;
    }
  }

  private checkAnswer() {
    this.virtualKeyboardComponent?.clearHighlights();

    if (this.word.toLowerCase() === this.text.toLowerCase()) {
      this.session.record('valid_play');
      this.modalRef.hide();
      this.solved.emit();
    } else {
      this.session.record('error_play');
      this.highlightKeys();
      this.sound_service.play('voices/incentive', 'ops_foi_quase');
    }

    this.text = '';
  }

  /**
   * Verde: letra digitada que existe na palavra.
   * Vermelho: letra digitada que não existe na palavra.
   * Azul piscando: letra da palavra que não foi digitada.
   */
  private highlightKeys() {
    const keyboard = this.virtualKeyboardComponent;
    if (!keyboard) return;

    for (const letter of this.text) {
      keyboard.highlight(letter, this.word.includes(letter) ? 'green-button' : 'red-button');
    }

    for (const letter of this.word) {
      if (!this.text.includes(letter)) {
        keyboard.highlight(letter, 'blue-button', 'blink');
      }
    }
  }
}

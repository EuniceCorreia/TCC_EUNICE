import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { GameAudioService } from '../game/game-audio.service';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.css']
})



export class VirtualKeyboardComponent {
  @Output() letterClick = new EventEmitter<string>();

  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ç', 'BackSpace','Enter'];

  keyboardRows: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'BackSpace'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
  ];

  constructor(private elementRef: ElementRef<HTMLElement>, private readonly audio: GameAudioService) {}

  onButtonClick(letter: string) {
    this.playAudio(letter);
    this.letterClick.emit(letter);
  }

  playAudio(letter: string) {
    if (letter == 'Ç') letter = 'c_cidilha'
    this.audio.play('letters', `letter_${letter}`);
  }

  coloredButton(id: string, color: string){
    // Compare IDs directly: typed input can contain CSS selector punctuation.
    const button = Array.from(this.elementRef.nativeElement.querySelectorAll('[id]'))
      .find(element => element.id === id.replace(/^#/, ''));
    button?.classList.add(color);
  }
  
  removeButtonsColors(){
    for(let letter of this.letters){
      this.elementRef.nativeElement.querySelector(`#letter_${letter}`)?.classList.remove('green-button', 'red-button', 'blue-button', 'blink')
    }
  }
}

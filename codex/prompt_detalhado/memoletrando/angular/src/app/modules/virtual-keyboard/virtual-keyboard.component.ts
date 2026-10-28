import { Component, ElementRef, EventEmitter, NgModule, Output } from '@angular/core';

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

  audio: any;

  constructor(private elementRef: ElementRef) {}

  onButtonClick(letter: any) {
    this.playAudio(letter);
    this.letterClick.emit(letter);
  }

  playAudio(letter: string) {
    if (letter == 'Ç') letter = 'c_cidilha'
    this.audio = new Audio();
    this.audio.src = `assets/audio/letters/letter_${letter.toLowerCase()}.mp3`;
    this.audio.load();
    this.audio.play();
  }

  coloredButton(id: string, color: string){
    this.elementRef.nativeElement.querySelector(id).classList.add(color)
  }
  
  removeButtonsColors(){
    for(let letter of this.letters){
      this.elementRef.nativeElement.querySelector(`#letter_${letter}`).classList.remove('green-button', 'red-button', 'blue-button', 'blink')
    }
  }
}

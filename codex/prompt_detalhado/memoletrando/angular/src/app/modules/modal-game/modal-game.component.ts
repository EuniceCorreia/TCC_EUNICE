import { Component, ElementRef, EventEmitter, Injector, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GameComponent } from '../game/game.component';
import { VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './modal-game.component.html',
  styleUrls: ['./modal-game.component.css']
})

export class ModalGameComponent implements OnInit{
  @ViewChild(VirtualKeyboardComponent)
  virtualKeyboardComponent!: VirtualKeyboardComponent;

  public onClose: EventEmitter<any> = new EventEmitter();
  
  time: any;
  title: string = '';
  message: string = '';

  gamePage: any;
  startTime: any;
  virtualKeyboard: any;

  word: string = '';
  image: string = '';

  text: string = '';
  
  constructor(public modalRef: BsModalRef, private injector: Injector, private elementRef: ElementRef, private dialog: MatDialog) {}

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('#text-response').focus();
    this.gamePage = this.injector.get(GameComponent)
    this.gamePage.startTimer(this.startTime)
    console.log(this.gamePage.getTime());
    
  }
  
  closeModal(value?: any) {
    this.modalRef.hide();
    this.onClose.emit(value);
  }
  
  
  onLetterClick(letter: any) {
    let time = this.gamePage.getTime();
    
    if(letter == 'BackSpace'){
      this.gamePage.registerEvent('delete_text', time.minutes, time.seconds, time.milliseconds, 'mouse', letter)
      this.text = this.text.slice(0, -1)
    }else if (letter == 'Enter'){
      this.gamePage.registerEvent('verify_text', time.minutes, time.seconds, time.milliseconds, 'mouse', letter)
      this.validatePlay()
    }else{
      this.gamePage.registerEvent('insert_text', time.minutes, time.seconds, time.milliseconds, 'mouse', letter)
      this.text += letter;      
    }
  }
  
  
  validatePlay(){
    console.log('validando');
    console.log();
    let time = this.gamePage.getTime();
    
    this.virtualKeyboardComponent.removeButtonsColors()
    if (this.word.toLowerCase() == this.text.toLowerCase()){
      console.log('acertou');
      //Validar periferico
      this.gamePage.registerEvent('valid_play', time.minutes, time.seconds, time.milliseconds, 'mouse', 'success')
      this.closeModal(this.gamePage.getListEvents())
    }else{
      this.gamePage.registerEvent('error_play', time.minutes, time.seconds, time.milliseconds, 'mouse', 'error')
      this.colorButtons()
      this.gamePage.playSound('voices/incentive', 'ops_foi_quase')
    }
    this.text = ''
  }

  colorButtons(){
    let correctLetters = ''
    for( let letter of this.text){
      let color;
      if(this.word.includes(letter)){
        color =  'green-button';
        correctLetters += letter
      }else{
        color =  'red-button';
      }
      this.virtualKeyboardComponent.coloredButton(`#letter_${letter}`, color);
    }
    
    for(let letter of this.word){
      if(!correctLetters.includes(letter)){
        this.virtualKeyboardComponent.coloredButton(`#letter_${letter}`, 'blue-button');
        this.virtualKeyboardComponent.coloredButton(`#letter_${letter}`, 'blink');
      }
    }
  }
  

}

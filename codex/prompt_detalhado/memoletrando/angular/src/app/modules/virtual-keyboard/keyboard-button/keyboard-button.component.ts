import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';


@Component({
  selector: 'app-keyboard-button',
  templateUrl: './keyboard-button.component.html',
  styleUrls: ['./keyboard-button.component.css']
})




export class KeyboardButtonComponent {
  @Input() label: string = '';
  @Output() buttonClick = new EventEmitter<string>();

  onClick() {
    this.buttonClick.emit(this.label);
  }
}

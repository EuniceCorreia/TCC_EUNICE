import { Component, ElementRef, EventEmitter, Inject, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GameComponent } from '../game/game.component';
import { VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit{
  @Output() closeModalEvent = new EventEmitter();
  
  title: string = '';
  description: string = '';
  image: string = '';
  
  
  constructor(
    private dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    
  }
  

  closeModal() {
    this.dialogRef.close();

    this.closeModalEvent.emit();
  }  

}

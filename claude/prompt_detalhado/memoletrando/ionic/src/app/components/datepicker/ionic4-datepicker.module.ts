import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LiIonic4DatepickerDirective } from './li-ionic4-datepicker.directive';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    LiIonic4DatepickerDirective,
    Ionic4DatepickerModalComponent
  ],
  exports: [
    LiIonic4DatepickerDirective,
    Ionic4DatepickerModalComponent,
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    // Ionic4DatepickerComponent,
    Ionic4DatepickerModalComponent
  ],
  providers: [

  ]
})
export class Ionic4DatepickerModule { }

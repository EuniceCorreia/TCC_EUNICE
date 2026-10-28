import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MultipleSelectComponent } from './multiple-select.component';
import { FormsModule } from '@angular/forms';
import { BaseModule } from 'src/app/base/base.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    BaseModule
  ],
  declarations: [MultipleSelectComponent],
  exports: [MultipleSelectComponent]
})

export class MultipleSelectComponentModule { }
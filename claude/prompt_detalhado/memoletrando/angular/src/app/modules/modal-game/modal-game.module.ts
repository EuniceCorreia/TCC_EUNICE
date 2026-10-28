import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalGameComponent } from './modal-game.component';
import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../account/auth/auth.guard';
import { VirtualKeyboardModule } from '../virtual-keyboard/virtual-keyboard.module';
import { VirtualKeyboardComponent } from '../virtual-keyboard/virtual-keyboard.component';


@NgModule({
    imports: [
        BaseModule,
        MaterialModule,
        ToastrModule,
        VirtualKeyboardModule
    ],
    declarations: [ModalGameComponent],
    providers: [ModalGameComponent]
})
export class ModalGameModule { }

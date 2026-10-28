import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../account/auth/auth.guard';
import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';
import { KeyboardButtonModule } from './keyboard-button/keyboard-button.module';



@NgModule({
    imports: [
        BaseModule,
        MaterialModule,
        ToastrModule,
        KeyboardButtonModule
    ],
    declarations: [
        VirtualKeyboardComponent,
        // KeyboardButtonComponent
    ],
    providers: [],
    exports:[VirtualKeyboardComponent]
})
export class VirtualKeyboardModule { }

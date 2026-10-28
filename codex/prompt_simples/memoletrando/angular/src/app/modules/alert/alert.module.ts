import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertComponent } from './alert.component';
import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../account/auth/auth.guard';
import { VirtualKeyboardModule } from '../virtual-keyboard/virtual-keyboard.module';


@NgModule({
    imports: [
        BaseModule,
        MaterialModule,
        ToastrModule,
    ],
    declarations: [AlertComponent],
    providers: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IfAuthModule } from '../modules/account/auth/if-auth/if-auth.module';


import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

registerLocaleData(localePt);

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        IfAuthModule,
        ModalModule.forRoot(),
    ],
    entryComponents: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        IfAuthModule,
    ],
    providers: [
    ],
})
export class BaseModule { }

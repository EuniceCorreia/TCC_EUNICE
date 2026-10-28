import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IfAuthModule } from '../modules/account/auth/if-auth/if-auth.module';

import { DocPipe } from '../pipes/doc';
import { PhonePipe } from '../pipes/phone';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';


import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { SelectComponent } from '../components/select/select.component';

registerLocaleData(localePt);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
    declarations: [
        DocPipe,
        PhonePipe,
        ConfirmComponent,
        SelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IfAuthModule,
        NgxMaskModule.forRoot(),
        CurrencyMaskModule,
        FontAwesomeModule,
        NgxMaskModule.forRoot(),
    ],
    entryComponents: [
        ConfirmComponent,
        SelectComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IfAuthModule,
        NgxMaskModule,
        CurrencyMaskModule,
        DocPipe,
        PhonePipe,
        FontAwesomeModule,
        NgxMaskModule
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ],
})
export class BaseModule { }

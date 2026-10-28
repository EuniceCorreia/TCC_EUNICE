import { NgModule } from '@angular/core';

import { AlertComponent } from './alert.component';
import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';

@NgModule({
    imports: [
        BaseModule,
        MaterialModule,
    ],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }

import { NgModule } from '@angular/core';

import { IfAuthDirective } from './if-auth.directive';

@NgModule({
    declarations: [IfAuthDirective],
    exports: [
        IfAuthDirective,
    ],
})
export class IfAuthModule { }

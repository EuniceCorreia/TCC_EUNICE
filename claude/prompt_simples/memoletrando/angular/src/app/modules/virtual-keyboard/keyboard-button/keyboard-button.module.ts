import { NgModule } from '@angular/core';

import { KeyboardButtonComponent } from './keyboard-button.component';
import { BaseModule } from 'src/app/base/base.module';

@NgModule({
    imports: [BaseModule],
    declarations: [KeyboardButtonComponent],
    exports: [KeyboardButtonComponent]
})
export class KeyboardButtonModule { }

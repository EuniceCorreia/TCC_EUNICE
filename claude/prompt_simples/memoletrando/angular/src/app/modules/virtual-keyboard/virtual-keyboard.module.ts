import { NgModule } from '@angular/core';

import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import { BaseModule } from 'src/app/base/base.module';
import { KeyboardButtonModule } from './keyboard-button/keyboard-button.module';

@NgModule({
    imports: [
        BaseModule,
        KeyboardButtonModule
    ],
    declarations: [VirtualKeyboardComponent],
    exports: [VirtualKeyboardComponent]
})
export class VirtualKeyboardModule { }

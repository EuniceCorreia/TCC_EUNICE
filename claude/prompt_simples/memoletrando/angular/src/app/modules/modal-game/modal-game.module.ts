import { NgModule } from '@angular/core';

import { ModalGameComponent } from './modal-game.component';
import { BaseModule } from 'src/app/base/base.module';
import { VirtualKeyboardModule } from '../virtual-keyboard/virtual-keyboard.module';

@NgModule({
    imports: [
        BaseModule,
        VirtualKeyboardModule
    ],
    declarations: [ModalGameComponent],
    exports: [ModalGameComponent]
})
export class ModalGameModule { }

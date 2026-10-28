import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserMultipleSelectionComponent } from './user-muliple-selection.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [UserMultipleSelectionComponent],
    exports: [UserMultipleSelectionComponent]
})

export class UserMultipleSelectionComponentModule { }
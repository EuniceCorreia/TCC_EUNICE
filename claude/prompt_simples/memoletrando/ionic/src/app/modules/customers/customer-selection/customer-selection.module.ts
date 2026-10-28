import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { CustomerSelectionComponent } from './customer-selection.component';

@NgModule({
    imports: [BaseModule],
    declarations: [CustomerSelectionComponent],
    exports: [CustomerSelectionComponent],
})
export class CustomerSelectionComponentModule {}

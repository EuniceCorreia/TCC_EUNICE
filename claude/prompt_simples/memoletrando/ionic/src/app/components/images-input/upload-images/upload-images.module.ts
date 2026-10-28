import { NgModule } from '@angular/core';
import { UploadImagesComponent } from './upload-images.component';
import { BaseModule } from 'src/app/base/base.module';
import { DndDirective } from './drag-and-drop.directive';

@NgModule({
    declarations: [
        UploadImagesComponent,
        DndDirective,
    ],
    imports: [
        BaseModule,
    ],
    exports: [UploadImagesComponent]
})
export class UploadImagesComponentModule { }

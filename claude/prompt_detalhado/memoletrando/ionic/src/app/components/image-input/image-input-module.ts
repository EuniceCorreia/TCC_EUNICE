import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BaseModule } from 'src/app/base/base.module';
import { ImageInputComponent } from './image-input.component';

@NgModule({
    declarations: [ImageInputComponent],
    imports: [
        BaseModule,
        ImageCropperModule
    ],
    exports: [ImageInputComponent],
})
export class ImageInputModule {}

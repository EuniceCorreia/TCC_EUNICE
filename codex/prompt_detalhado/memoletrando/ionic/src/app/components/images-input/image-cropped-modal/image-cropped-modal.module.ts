import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BaseModule } from 'src/app/base/base.module';
import { ImageCroppedModal } from './image-cropped-modal.page';

@NgModule({
    imports: [
        BaseModule,
        ImageCropperModule
    ],
    declarations: [
        ImageCroppedModal,
    ],
    entryComponents: [
    ]
})
export class ImageCroppedModalModule { }

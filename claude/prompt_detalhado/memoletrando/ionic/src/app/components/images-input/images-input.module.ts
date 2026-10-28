import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BaseModule } from 'src/app/base/base.module';
import { ReorderImages } from '../reorder-images/reorder-images.page';
import { UploadImagesComponentModule } from './upload-images/upload-images.module';
import { ImageCroppedModalModule } from './image-cropped-modal/image-cropped-modal.module';
import { ImagesInputComponent } from './images-input.component';
import { VehiclePictureTemplateModalModule } from '../vehicle-picture-template-modal/vehicle-picture-template-modal.module';

@NgModule({
    declarations: [ImagesInputComponent, ReorderImages],
    imports: [
        BaseModule,
        ImageCropperModule,
        UploadImagesComponentModule,
        ImageCroppedModalModule,
        VehiclePictureTemplateModalModule
    ],
    exports: [ImagesInputComponent],
})
export class ImagesInputModule { }

import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { HelperService } from 'src/app/base/helper.service';
import { Image } from 'src/app/modules/images/image';
import { OutputFormat } from 'ngx-image-cropper';
import { ImageService } from 'src/app/modules/images/image.service';
import { ModalController } from '@ionic/angular';
import { ReorderImages } from '../reorder-images/reorder-images.page';
import { ImageCroppedModal } from './image-cropped-modal/image-cropped-modal.page';
import { VehiclePictureTemplateModal } from '../vehicle-picture-template-modal/vehicle-picture-template-modal.page';

@Component({
    selector: 'images-input',
    templateUrl: './images-input.component.html',
    styleUrls: ['./images-input.scss'],
    providers: [ImageService],
})
export class ImagesInputComponent implements OnInit {
    @Input() images: Image[] = [];

    @Input() resizeToWidth = 1920;
    @Input() resizeToHeight = 1080;
    @Input() label = 'Selecione uma Imagem';
    @Input() disabled = false;
    @Input() show_picture_template = false;
    @Input() imagesListLabel = 'Imagens';
    @Input() limit = 3;
    uploaded_images: any[] = [];

    format: OutputFormat = 'webp'; //formato otimizado
    aspectRatio = 1.78;

    url_s3: string = this.image_service.url_s3;

    croppedImage: any = '';

    constructor(
        private helper_service: HelperService,
        private image_service: ImageService,
        private modal_controller: ModalController,
    ) { }

    ngOnInit() {
        this.aspectRatio = parseFloat(
            (this.resizeToWidth / this.resizeToHeight).toFixed(2)
        );
    }

    ionViewWillEnter() { }

    fileChangeEvent(files: any): void {
        for (const file of files) {
            this.imageProcess(file);
        }
    }

    imageProcess(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.uploaded_images.push({ base64: reader.result, file: file });
        };
    }

    selectImageCrop(uploaded_image: any, index_uploaded_image: number) {
        var event = {
            target: {
                files: [uploaded_image.file]
            }
        };
        this.openModalImageCropped(event, index_uploaded_image);
    }


    async openModalImageCropped(event: any, index_uploaded_image: number) {
        const modal = await this.modal_controller.create({
            component: ImageCroppedModal,
            componentProps: {
                image_changed_event: event,
                resize_to_width: this.resizeToWidth,
                resize_to_height: this.resizeToHeight,
                format: this.format,
                aspect_ratio: this.aspectRatio,
            },
            cssClass: 'image-cropped-modal',
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if (data && data.base64) {
            this.images.push(data);
            this.removeUploadedImage(index_uploaded_image);
        }
    }

    async reorder() {
        let modal = await this.modal_controller.create({
            component: ReorderImages,
            componentProps: {
                images: this.images,
            },
            cssClass: 'reorder-images-modal',
        });

        modal.present();
        const data = await modal.onDidDismiss();
    }

    async removeImage(image: Image, index: number, eventPopover: any) {
        let popover = await this.helper_service.popover(
            eventPopover,
            'Tem certeza?',
            [
                {
                    text: 'voltar',
                    color: 'white',
                    value: false,
                },
                {
                    text: 'remover',
                    color: 'danger',
                    value: true,
                },
            ]
        );

        popover.onDidDismiss().then(async (popoverData) => {
            if (popoverData.data === true) {
                if (image.id > 0) {
                    this.destroyImage(image, index);
                } else {
                    this.helper_service.toast('success', 'Removido com sucesso');
                    this.images.splice(index, 1);
                }
            }
        });

        popover.present();
    }

    async destroyImage(image: Image, index: number) {
        this.image_service.destroy(image.id).then(
            (data: any) => {
                if (data.error) {
                    this.helper_service.toast('error', data.message);
                }
                this.helper_service.toast('success', 'Removido com sucesso');
                this.images.splice(index, 1);
            },
            (error: any) => {
                this.helper_service.responseErrors(error);
            }
        );
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    async removeUploadedImage(index: number) {
        this.uploaded_images.splice(index, 1);
    }

    async openModalPictureTemplate() {
        const modal = await this.modal_controller.create({
            component: VehiclePictureTemplateModal,
            componentProps: {
            },
            cssClass: 'image-cropped-modal',
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
    }

    debug() {
    }
}

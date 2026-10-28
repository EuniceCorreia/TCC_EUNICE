import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ImageCroppedEvent, OutputFormat } from 'ngx-image-cropper';
import { HelperService } from 'src/app/base/helper.service';
import { Image } from 'src/app/modules/images/image';

@Component({
    selector: 'image-cropped-modal',
    templateUrl: './image-cropped-modal.page.html',
    styleUrls: ['./image-cropped-modal.page.scss'],
})
export class ImageCroppedModal implements OnInit {

    resize_to_width = 1920;
    resize_to_height = 1080;
    format: OutputFormat = 'webp'; //formato otimizado
    aspect_ratio = 1.78;

    image_changed_event: any = '';
    cropped_image: any = '';

    constructor(
        private helper_service: HelperService,
        private nav_params: NavParams,
        private modal_controller: ModalController,
    ) {
        this.image_changed_event = this.nav_params.get('image_changed_event') || null;
        this.resize_to_width = this.nav_params.get('resize_to_width') || this.resize_to_width;
        this.resize_to_height = this.nav_params.get('resize_to_height') || this.resize_to_height;
        this.format = this.nav_params.get('format') || this.format;
        this.aspect_ratio = this.nav_params.get('aspect_ratio') || this.aspect_ratio;
    }

    ngOnInit() { }

    ionViewWillEnter() { }

    pushImage() {
        this.modal_controller.dismiss(new Image({ base64: this.cropped_image }));
    }

    imageCropped(event: ImageCroppedEvent) {
        this.cropped_image = event.base64;
    }

    imageLoaded() { }

    cropperReady() { }

    loadImageFailed() {
        return this.helper_service.toast('danger', 'Formato de imagem não suportada.');
    }

    async dismiss() {
        await this.modal_controller.dismiss(false);
    }
}

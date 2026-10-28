import { OnInit, Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HelperService } from 'src/app/base/helper.service';
import { Image } from 'src/app/modules/images/image';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageService } from 'src/app/modules/images/image.service';

@Component({
    selector: 'image-input',
    templateUrl: './image-input.component.html',
    styleUrls: ['./image-input.scss'],
})
export class ImageInputComponent implements OnInit {

    @Input() image = new Image();
    @Output() imageChange = new EventEmitter<Image>();

    @Input() resizeToWidth = 1920;
    @Input() resizeToHeight = 1080;
    @Input() label = 'Selecione uma Imagem';
    @Input() disabled = false;


    format: string = 'webp'; //formato otimizado
    aspectRatio = 1;

    url_s3: string = this.imageService.url_s3;

    imageChangedEvent: any = '';
    croppedImage: any = '';

    constructor(
        private helperService: HelperService,
        private imageService: ImageService
    ) { }

    ngOnInit() {
        this.aspectRatio = parseFloat((this.resizeToWidth / this.resizeToHeight).toFixed(2));
    }

    ionViewWillEnter() { }

    pushImage() {
        this.image = new Image({ base64: this.croppedImage });
        this.imageChangedEvent = null;
        this.croppedImage = null;
        this.imageChange.emit(this.image)
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() { }

    cropperReady() { }

    loadImageFailed() {
        return this.helperService.toast('danger', 'Formato de imagem não suportada.');
    }

    get_thumb(image: any, prefix: string) {
        return image.path.replace('/' + image.imageable_id + '_', '/' + prefix + image.imageable_id + '_');
    }

    async removeImage(image: Image, eventPopover: any) {
        let popover = await this.helperService.listPopover(eventPopover, 'Tem certeza?', [
            {
                text: 'voltar',
                color: 'medium',
                value: false
            },
            {
                text: 'remover',
                color: 'danger',
                value: true
            },
        ]);

        popover.onDidDismiss().then(async (popoverData) => {
            if (popoverData.data === true) {
                if (image.id > 0) {
                    this.destroyImage(image);
                } else {
                    this.helperService.toast('success', 'Removido com sucesso');
                    this.image = new Image();
                }
                this.imageChange.emit(this.image)
            }
        });

        popover.present();
    }

    async changeImage(image: Image, eventPopover: any) {
        let popover = await this.helperService.listPopover(eventPopover, 'Tem certeza? A imagem atual será apagada!', [
            {
                text: 'voltar',
                color: 'medium',
                value: false
            },
            {
                text: 'trocar',
                color: 'danger',
                value: true
            },
        ]);

        popover.onDidDismiss().then(async (popoverData) => {
            if (popoverData.data === true) {
                if (image.id > 0) {
                    await this.destroyImage(image);
                } else {
                    this.helperService.toast('success', 'Removido com sucesso');
                    this.image = new Image();
                }
                this.imageChange.emit(this.image)

                setTimeout(() => {
                    document.getElementById('inputFile').click()
                }, 700);

            }
        });

        popover.present();
    }

    async destroyImage(image: Image) {
        await this.imageService.destroy(image.id)
            .then(
                async (data: any) => {
                    if (data.error) {
                        this.helperService.toast('error', data.message);
                    }
                    this.helperService.toast('success', 'Removido com sucesso');
                    this.image = new Image();
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }

    debug() {
    }
}

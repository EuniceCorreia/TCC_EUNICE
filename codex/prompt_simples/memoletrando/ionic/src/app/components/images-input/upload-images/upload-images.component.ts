import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {
    @Output() uploaded_images = new EventEmitter();
    files: any[] = [];

    /**
     * on file drop handler
     */
    onFileDropped($event) {
        this.prepareFilesList($event);
        this.uploaded_images.emit($event);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(event) {
        let files = event.target.files;
        this.prepareFilesList(files);
        this.uploaded_images.emit(files);
        (<HTMLInputElement>document.getElementById("fileDropRef")).value = "";
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            this.files.push(item);
        }
    }
}

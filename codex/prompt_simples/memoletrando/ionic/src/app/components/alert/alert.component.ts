import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

    title: string;
    buttons: Array<Object>;

    constructor(
        private alertController: AlertController,
    ) { }

    ngOnInit() { }

    async dismiss(value: boolean) {
        await this.alertController.dismiss(value)
    }

}

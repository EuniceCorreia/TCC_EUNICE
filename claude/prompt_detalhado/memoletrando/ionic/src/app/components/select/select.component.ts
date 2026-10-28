import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {

    title = 'Options';
    options: Array<any> = [];
    items: Array<any> = [];

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
    ) {
        this.title = this.navParams.get('title');
        this.options = this.navParams.get('options');
        this.items = this.options;
    }

    ngOnInit() {
    }

    async dismiss(value: any) {
        await this.modalController.dismiss(value)
    }

    filterList(event: any) {
        this.options = this.items.filter((item: any) => {
            return item.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1;
        });
    }

}

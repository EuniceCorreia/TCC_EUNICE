import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-list-popover',
    templateUrl: './list-popover.component.html',
    styleUrls: ['./list-popover.component.scss'],
})
export class ListPopoverComponent implements OnInit {

    title: string;
    buttons: ButtonListPopover[] = [];

    constructor(
        private popoverController: PopoverController,
    ) { }

    ngOnInit() { }

    async dismiss(value: boolean) {
        await this.popoverController.dismiss(value)
    }

}

interface ButtonListPopover {
    id: number,
    value: any,
    color: string,
    text: string
} 
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-list-popover',
    templateUrl: './list-popover.component.html',
    styleUrls: ['./list-popover.component.scss'],
})
export class ListPopoverComponent implements OnInit {

    title: string;
    buttons: Array<any>;

    constructor(
        private popoverController: PopoverController,
        private router: Router
    ) {
    }

    ngOnInit() { }

    async routerNavigate(item: any) {

        if (item.query_params) {
            let navigationExtras: NavigationExtras = {
                queryParams: item.query_params
            };
            await this.popoverController.dismiss()

            this.router.navigate([item.router], navigationExtras);
        } else {

            await this.popoverController.dismiss()
            return this.router.navigate([item.router]);
        }


    }

    async dismiss(value: boolean) {
        await this.popoverController.dismiss(value)
    }

}

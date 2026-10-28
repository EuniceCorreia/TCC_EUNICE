import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Customer } from '../customer';

import { CustomerService } from '../customer.service';
import { HelperService } from 'src/app/base/helper.service';

@Component({
    templateUrl: './customer-selection.component.html',
    styleUrls: ['./customer-selection.scss'],
})
export class CustomerSelectionComponent implements OnInit {
    public title = 'Clientes';
    public options: Array<Customer> = [];
    public loading: boolean = true;
    public items: Array<Customer> = [];
    public region_id: number = null;
    constructor(
        private modalController: ModalController,
        private helperService: HelperService,
        private customerService: CustomerService,
        private navParams: NavParams
    ) {
        this.region_id = this.navParams.get('region_id');
        // this.regions.map((region) => this.regions_id.push(region.id));
        // this.regions.forEach((element) => {
        //     this.regions_id.push(element.id);
        // });
    }

    ionViewWillEnter() {
        this.getCustomers();
    }

    ngOnInit() {
        //
    }

    saveCashflowCategory() { }

    getCustomers() {
        this.loading = true;

        this.customerService
            .get(
                ['user', 'address.city.state', 'phone'],
                {},
                { count: 99999, page: 1 }
            )
            .then(
                (response) => {
                    if (!response.error) {
                        this.options = response.customers.map(
                            (customer) => new Customer(customer)
                        );
                        this.items = this.options;
                    }
                    this.loading = false;
                },
                (error) => this.helperService.responseErrors(error)
            );
    }

    setOptions() {
        this.loading = true;
        this.options = this.items.map((customer) => new Customer(customer));
        this.loading = false;
    }

    async dismiss(value: any) {
        await this.modalController.dismiss(value);
    }

    filterList(event: any) {
        this.options = this.items.filter((option: any) => {
            return (
                option.person.name
                    .toLowerCase()
                    .indexOf(event.detail.value.toLowerCase()) > -1
            );
        });
    }
}

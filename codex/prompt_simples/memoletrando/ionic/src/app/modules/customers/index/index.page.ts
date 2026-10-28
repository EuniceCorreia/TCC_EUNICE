import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { Customer } from '../customer';

import { CustomerService } from '../customer.service';
import { HelperService } from 'src/app/base/helper.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

    public customers: Array<Customer> = [];
    public loading: boolean = false;

    public showFilter: boolean;
    public filters: any = {
        name: null,
        doc: null,
    };

    public total_of_data = 0;
    public _paginate: any = {
        take: 20,
        page: 1
    };

    public trs: any = new Array(5);
    public tds: any = new Array(1);

    constructor(
        private customerService: CustomerService,
        private helperService: HelperService,
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.paginate(null, null);
    }

    getFilters() {
        var filters = {};

        Object.keys(this.filters).forEach(key => {
            if (this.filters[key]) {
                filters[key] = "%" + this.filters[key] + "%";
            }
        }, this);

        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher == null && ionInfiniteScroll == null)) {
            this.customers = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.customerService.get(['user', 'phone'], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.customers.total;
                    this._paginate.page = response.customers.current_page + 1;
                    for (let customer of response.customers.data) {
                        this.customers.push(new Customer(customer))
                    }

                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.customers.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            )
    }

    async remove(user: Customer, eventPopover: any, slidingItem: IonItemSliding) {
        let popover = await this.helperService.popover(eventPopover, 'Tem certeza?', [
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

        popover.onDidDismiss().then((popoverData) => {
            if (popoverData.data === true) {
                this.helperService.loading('Removendo');
                this.destroy(user, slidingItem);
            } else {
                slidingItem.close();
            }
        });

        popover.present();
    }

    destroy(model: Customer, slidingItem: IonItemSliding) {
        this.customerService.destroy(model.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.customers.findIndex(ac => ac.id == model.id);
                    if (index > -1) {
                        this.customers.splice(index, 1);
                    }
                }
                this.helperService.toast(response.error ? 'warning' : 'success', response.message);
                slidingItem.close();
            }, (error) => {
                this.helperService.responseErrors(error);
            })
            .then(() => this.helperService.loading_dismiss())
    }

    toggleSearch() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            setTimeout(() => {
                this.search.setFocus();
            }, 100)
        }
    }
}

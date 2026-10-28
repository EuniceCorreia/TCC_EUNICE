import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { Auditing } from '../auditing';

import { AuditingService } from '../auditing.service';
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

    public auditings: Array<Auditing> = [];
    public loading: boolean = false;

    public showFilter: boolean;
    public filters: any = {
        name: null,
        comment: null
    };

    public total_of_data = 0;
    public _paginate: any = {
        take: 40,
        page: 1
    };

    public trs: any = new Array(5);
    public tds: any = new Array(1);

    constructor(
        private auditingService: AuditingService,
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

        filters['orderBy'] = '!id';

        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher == null && ionInfiniteScroll == null)) {
            this.auditings = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.auditingService.get(['causer'], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.auditings.total;
                    this._paginate.page = response.auditings.current_page + 1;
                    for (let employee of response.auditings.data) {
                        this.auditings.push(new Auditing(employee))
                    }

                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.auditings.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            )
    }

    async remove(auditing: Auditing, eventPopover: any, slidingItem: IonItemSliding) {
        let popover = await this.helperService.popover(eventPopover, 'Tem certeza? Essa ação não pode ser desfeita.', [
            {
                text: 'Voltar',
                color: 'medium',
                value: false
            },
            {
                text: 'Remover',
                color: 'danger',
                value: true
            },
        ]);

        popover.onDidDismiss().then((popoverData) => {
            if (popoverData.data === true) {
                this.helperService.loading('Removendo');
                this.destroy(auditing, slidingItem);
            } else {
                slidingItem.close();
            }
        });

        popover.present();
    }

    destroy(model: Auditing, slidingItem: IonItemSliding) {
        this.auditingService.destroy(model.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.auditings.findIndex(ac => ac.id == model.id);
                    if (index > -1) {
                        this.auditings.splice(index, 1);
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

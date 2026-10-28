import { Component, OnInit, ViewChild } from '@angular/core';

import { AccessLevel } from '../access-level';
import { AccessLevelService } from '../access-level.service';
import { HelperService } from 'src/app/base/helper.service';

import { IonItemSliding, IonInfiniteScroll, IonContent } from '@ionic/angular';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

    public access_levels: Array<AccessLevel> = [];
    public loading: boolean = false;

    public showFilter: boolean;
    public filters: any = {
        name: null
    };

    public total_of_data = 0;
    public _paginate: any = {
        take: 20,
        page: 1,
    };

    public trs: any = new Array(5);
    public tds: any = new Array(1);

    constructor(
        private accessLevelService: AccessLevelService,
        private helperService: HelperService,
    ) { }

    ngOnInit() {
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
            this.access_levels = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.accessLevelService.get([], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.access_levels.total;
                    this._paginate.page = response.access_levels.current_page + 1;
                    for (let access_level of response.access_levels.data) {
                        this.access_levels.push(new AccessLevel(access_level))
                    }

                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.access_levels.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            )
    }

    async remove(access_level: AccessLevel, eventPopover: any, slidingItem: IonItemSliding) {
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
                this.destroy(access_level, slidingItem);
            } else {
                slidingItem.close();
            }
        });

        popover.present();
    }

    destroy(access_level: AccessLevel, slidingItem: IonItemSliding) {
        this.accessLevelService.destroy(access_level.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.access_levels.findIndex(ac => ac.id == access_level.id);
                    if (index > -1) {
                        this.access_levels.splice(index, 1);
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

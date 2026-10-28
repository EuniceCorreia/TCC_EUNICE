import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { Theme } from '../theme';

import { ThemeService } from '../theme.service';
import { HelperService } from 'src/app/base/helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

    public themes: Array<Theme> = [];
    public loading: boolean = false;

    public showFilter: boolean;
    public filters: any = {
        name: null
    };

    public total_of_data = 0;
    public _paginate: any = {
        take: 20,
        page: 1
    };

    public trs: any = new Array(5);
    public tds: any = new Array(1);

    url_s3: string = this.theme_service.url_s3;

    reorder: boolean = false;

    constructor(
        private theme_service: ThemeService,
        private helper_service: HelperService,
        private router: Router
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
        filters['orderBy'] = 'order';
        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher == null && ionInfiniteScroll == null)) {
            this.themes = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.theme_service.get(['image'], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.themes.total;
                    this._paginate.page = response.themes.current_page + 1;
                    for (let theme of response.themes.data) {
                        this.themes.push(new Theme(theme))
                    }

                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.themes.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helper_service.responseErrors(error)
                }
            )
    }

    async remove(theme: Theme, eventPopover: any) {
        let popover = await this.helper_service.popover(eventPopover, 'Tem certeza?', [
            {
                text: 'voltar',
                color: 'gray',
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
                this.helper_service.loading('Removendo');
                this.destroy(theme);
            }
        });

        popover.present();
    }

    destroy(model: Theme) {
        this.theme_service.destroy(model.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.themes.findIndex(ac => ac.id == model.id);
                    if (index > -1) {
                        this.themes.splice(index, 1);
                    }
                }
                this.helper_service.toast(response.error ? 'warning' : 'success', response.message);
            }, (error) => {
                this.helper_service.responseErrors(error);
            })
            .then(() => this.helper_service.loading_dismiss())
    }

    toggleSearch() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            setTimeout(() => {
                this.search.setFocus();
            }, 100)
        }
    }

    reorderThemes() {
        this.reorder = !this.reorder;
    }

    reorderItems(event) {
        const itemMove = this.themes.splice(event.detail.from, 1)[0];
        itemMove.order = event.detail.to;
        this.themes.splice(event.detail.to, 0, itemMove);
        event.detail.complete();
        this.saveOrder();
    }

    async saveOrder() {
        this.loading = true;
        await this.theme_service.saveOrder(this.themes)
            .then(
                async (response: any) => {
                    this.loading = false;

                    if (response.error) {
                        this.helper_service.toast('danger', response.message);
                        return;
                    }
                },
                (error: any) => {
                    this.loading = false;

                    this.helper_service.responseErrors(error)
                }
            )
    }
}

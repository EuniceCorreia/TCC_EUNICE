import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { GameFigure } from '../game-figure';

import { GameFigureService } from '../game-figure.service';
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

    public game_figures: Array<GameFigure> = [];
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

    url_s3: string = this.game_figure_service.url_s3;

    constructor(
        private game_figure_service: GameFigureService,
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
        // filters['orderBy'] = 'order';
        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher == null && ionInfiniteScroll == null)) {
            this.game_figures = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.game_figure_service.get(['image', 'category', 'level'], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.game_figures.total;
                    this._paginate.page = response.game_figures.current_page + 1;
                    for (let game_figure of response.game_figures.data) {
                        this.game_figures.push(new GameFigure(game_figure))
                    }

                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.game_figures.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helper_service.responseErrors(error)
                }
            )
    }

    async remove(game_figure: GameFigure, eventPopover: any) {
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
                this.destroy(game_figure);
            }
        });

        popover.present();
    }

    destroy(model: GameFigure) {
        this.game_figure_service.destroy(model.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.game_figures.findIndex(ac => ac.id == model.id);
                    if (index > -1) {
                        this.game_figures.splice(index, 1);
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonItemSliding } from '@ionic/angular';

import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    @ViewChild('search', { static: false }) search: any;
    @ViewChild(IonContent, { static: false }) content: IonContent;
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

    users: Array<User> = [];
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

    constructor(
        private userService: UserService,
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
                if (key == 'id') {
                    filters[key] = this.filters[key];
                } else {
                    filters[key] = "%" + this.filters[key] + "%";
                }
            }
        }, this);


        return filters;
    }

    async paginate(ionRefresher: any = null, ionInfiniteScroll: any = null) {
        if (ionRefresher !== null || (ionRefresher == null && ionInfiniteScroll == null)) {
            this.users = [];
            this._paginate.page = 1;
        }
        this.loading = true;
        this.userService.get(['access_level'], this.getFilters(), this._paginate)
            .then(
                async (response: any) => {
                    this.total_of_data = response.users.total;
                    this._paginate.page = response.users.current_page + 1;
                    for (let user of response.users.data) {
                        this.users.push(new User(user))
                    }

                    this.loading = false;
                    if (ionRefresher) {
                        ionRefresher.target.complete();
                    }
                    if (ionInfiniteScroll) {
                        ionInfiniteScroll.target.complete();
                    }
                    if (this.total_of_data == this.users.length) {
                        // ionInfiniteScroll.target.disabled = true;
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            )
    }

    async remove(user: User, eventPopover: any, slidingItem: IonItemSliding) {
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
                this.destroy(user, slidingItem);
            } else {
                slidingItem.close();
            }
        });

        popover.present();
    }

    destroy(user: User, slidingItem: IonItemSliding) {
        this.userService.destroy(user.id)
            .then((response) => {
                if (!response.error) {
                    var index = this.users.findIndex(ac => ac.id == user.id);
                    if (index > -1) {
                        this.users.splice(index, 1);
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

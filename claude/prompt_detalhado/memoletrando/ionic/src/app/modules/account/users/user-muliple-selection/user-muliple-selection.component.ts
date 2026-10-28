import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-select',
    templateUrl: './user-muliple-selection.component.html',
})
export class UserMultipleSelectionComponent implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    public title = 'Usuários';
    public loading: boolean = true;
    public options: any = [];
    public items: any = [];

    selecteds: any = [];
    values: any = [];

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private userService: UserService,
        private helperService: HelperService
    ) {
        this.selecteds = this.navParams.get('selecteds');
        this.items = this.navParams.get('items');
    }

    ngOnInit() {
        if (!this.items) {
            this.getUsers();
        } else {
            this.setItems();
        }
    }

    getUsers() {
        this.userService.get(['authenticable.contacts'], { active: 1 }).then(
            (response: any) => {
                if (!response.error) {
                    this.options = response.users.map((user) => new User(user));
                    if (this.selecteds && this.selecteds.length > 0) {
                        this.selecteds.forEach((item) => {
                            this.options.forEach((option) => {
                                if (option.id == item.id) {
                                    this.values.push(option);
                                }
                            });
                        });
                    }
                    this.items = this.options;
                    this.loading = false;
                    this.search.setFocus();
                }
            },
            (error: any) => {
                this.helperService.toast('error', error);
            }
        );
    }

    setItems() {
        this.options = this.items;
        if (this.selecteds && this.selecteds.length > 0) {
            this.selecteds.forEach((item) => {
                this.options.forEach((option) => {
                    if (option.id == item.id) {
                        this.values.push(option);
                    }
                });
            });
        }
        this.items = this.options;
        this.loading = false;
    }

    async dismiss() {
        await this.modalController.dismiss(this.values);
    }

    async select(value: any) {
        let index = this.values.indexOf(value);
        if (index > -1) {
            this.values.splice(index, 1);
        } else {
            this.values.push(value);
        }
    }

    filterList(event: any) {
        this.items = this.options.filter((item: any) => {
            return (
                item.model
                    .toLowerCase()
                    .indexOf(event.detail.value.toLowerCase()) > -1
            );
        });
    }
}

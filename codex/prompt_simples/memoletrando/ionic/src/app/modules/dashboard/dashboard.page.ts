import { Component, OnInit } from '@angular/core';

import { User } from '../account/users/user';

import { UserService } from '../account/users/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
    loading: boolean = true;
    user: User = new User();

    constructor(
        private user_service: UserService,
    ) {
    }

    ngOnInit() { }

    ionViewWillEnter() {
        this.user = this.user_service.user;

        this.init();
    }

    async init() {
    }

}

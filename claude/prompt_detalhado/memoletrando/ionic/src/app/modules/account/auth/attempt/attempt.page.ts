import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { UserService } from '../../users/user.service';

@Component({
    selector: 'app-attempt',
    templateUrl: './attempt.page.html',
    styleUrls: ['./attempt.page.scss'],
})
export class AttemptPage implements OnInit {

    urlOld: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private navController: NavController
    ) {
        this.urlOld = this.route.snapshot.paramMap.get("url");
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.attempt();
    }

    attempt() {
        this.userService.validateToken(['access_level.permissions', 'authenticable']).then(
            data => {
                if (data) {
                    this.userService.setUser({ user: data }, (response: boolean) => {
                        if (this.urlOld == '' || this.urlOld == null) {
                            this.navController.navigateRoot(['/dashboard'])
                        } else {
                            this.urlOld = decodeURI(this.urlOld);
                            if (this.urlOld.includes(';')) {
                                let url = this.urlOld.split(';');
                                this.router.navigate([url[0]]);
                            } else {
                                this.navController.navigateForward([this.urlOld])
                            }
                        }
                    });
                } else {
                    this.userService.unsetUser((response: boolean) => {
                        this.navController.navigateRoot(['/auth/login']);
                    });
                }
            },
            (err) => {
                this.navController.navigateRoot(['/auth/login'])
            }
        )
    }

}

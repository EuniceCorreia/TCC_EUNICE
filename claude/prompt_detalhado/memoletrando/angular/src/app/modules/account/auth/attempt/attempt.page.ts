import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    ) {
        this.urlOld = this.route.snapshot.paramMap.get("url") || '';
    }

    ngOnInit() {
        this.attempt();
    }

    attempt() {
        this.userService.validateToken(['access_level.permissions']).then(
            data => {
                if (data) {                    
                    this.userService.setUser({ user: data }, (response: boolean) => {
                        if (this.urlOld == '' || this.urlOld == null) {
                            this.router.navigate(['/temas']);
                        } else {
                            this.urlOld = decodeURI(this.urlOld);
                            if (this.urlOld.includes(';')) {
                                let url = this.urlOld.split(';');
                                this.router.navigate([url[0]]);
                            } else {
                                this.router.navigate([this.urlOld])
                            }
                        }
                    });
                } else {
                    this.userService.unsetUser((response: boolean) => {
                        this.router.navigate(['/auth/login']);
                    });
                }
            },
            (err) => {
                this.userService.unsetUser();
                this.router.navigate(['/auth/login']);
            }
        )
    }

}

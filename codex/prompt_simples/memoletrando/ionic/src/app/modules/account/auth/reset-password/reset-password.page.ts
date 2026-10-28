import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { ResetPassword } from './reset-password';

import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../../users/user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

    data: ResetPassword = new ResetPassword;
    public showPassword: boolean = false;

    constructor(
        private helperService: HelperService,
        private menu: MenuController,
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit() {

        if (this.userService.isLoggedIn) {
            return this.router.navigate(['/dashboard']);
        }

        // if (localStorage.getItem(this.userService.api_token_name)) {
        //     return this.router.navigate(['/attempt']);
        // }

    }

    ionViewWillEnter() {
        this.data = new ResetPassword;
        this.menu.enable(false);
    }

    sendEmail() {
        this.helperService.loading("Enviando E-mail")
        this.userService.sendForgotPasswordEmail(this.data)
            .then(response => {

                this.data.validateEmail(response.error);
                this.helperService.loading_dismiss()
                this.helperService.toast(response.error ? 'warning' : 'success', response.message);
            }, error => {
                this.helperService.loading_dismiss()
                this.helperService.responseErrors(error);
            });
    }

    validateResetToken() {
        this.helperService.loading("Validando")
        this.userService.validateResetToken(this.data)
            .then(response => {
                this.data.validateToken(response.valid);
                this.helperService.loading_dismiss()
            }, error => {
                this.helperService.responseErrors(error);
                this.helperService.loading_dismiss()
            });
    }

    skipEmail() {
        this.data.skipEmail();
    }

    updatePassword() {
        this.helperService.loading("Alterando")
        this.userService.updatePassword(this.data, ['access_level.permissions', 'authenticable'])
            .then(response => {
                this.helperService.loading_dismiss()

                if (!response.error) {
                    response.user.password = this.data.password;
                    this.userService.setUser(response, null);
                    this.router.navigate(['/dashboard']);
                }
                this.helperService.toast(response.error ? 'warning' : 'success', response.message);
            }, error => {
                this.helperService.loading_dismiss()
                this.helperService.responseErrors(error);
            });
    }
}

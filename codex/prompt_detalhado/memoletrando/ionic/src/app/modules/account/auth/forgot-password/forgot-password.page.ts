import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { HelperService } from 'src/app/base/helper.service';
import { PasswordResetData } from './password-reset-data';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

    data: PasswordResetData = new PasswordResetData;
    showPassword: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private helperService: HelperService
    ) { }

    ngOnInit() {

        if (this.userService.isLoggedIn) {
            return this.router.navigate(['/dashboard']);
        }

        if (localStorage.getItem(this.userService.api_token_name)) {
            return this.router.navigate(['/attempt']);
        }

    }

    ionViewWillEnter() {
        this.data = new PasswordResetData;
    }

    sendEmail() {
        this.userService.sendForgotPasswordEmail(this.data)
            .then(response => {
                this.data.validateEmail(response.error);
                this.helperService.toast(response.error ? 'warning' : 'success', response.message);
            }, error => {
                this.helperService.responseErrors(error);
            });
    }

    validateResetToken() {
        this.userService.validateResetToken(this.data)
            .then(response => {
                this.data.validateToken(response.error);
            }, error => {
                this.helperService.responseErrors(error);
            });
    }

    skipEmail() {
        this.data.skipEmail();
    }

    updatePassword() {
        this.userService.updatePassword(this.data, ['access_level.permissions', 'authenticable'])
            .then(response => {
                if (!response.error) {
                    this.userService.setUser(response, null);
                    this.router.navigate(['/dashboard']);
                }

                this.helperService.toast(response.error ? 'warning' : 'success', response.message);
            }, error => {
                this.helperService.responseErrors(error);
            });
    }
}

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../modules/account/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ConfirmComponent } from '../components/confirm/confirm.component';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    loader: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private _snackBar: MatSnackBar,
        private spinner: NgxSpinnerService
    ) {
    }

    responseErrors(error: any) {
        if (error.status == 401) {
            if (this.router.url == '/auth/login') {
                if(error.error && error.error.message) {
                    this.toast('danger', error.error.message);
                } else {
                    this.toast('danger', 'Usuário ou senha inválidos');
                }
            } else {
                this.userService.unsetUser();
                this.router.navigate(['/auth/login']);
                this.toast('primary', 'Sua sessão expirou, digite suas credenciais novamente.');
            }
        } else if (error.status == 429) {
            this.toast('warning', 'Muitos pedidos em andamento. Aguarde.');
        } else if (error.error.error == 'token_not_provided') {
            this.toast('danger', 'Você não forneceu um token válido.');
            this.router.navigate(['/auth/login']);
        } else if (error) {
            this.toast('warning', error.error.message);
        } else {
            this.toast('danger', 'Erro ao processar solicitação!');
        }
    }

    async toast(color: string, message: string, duration: number = 4000, position: any = 'top', cssClass = '', buttons: any = []) {
        if (buttons.length == 0) {
            buttons.push({
                icon: 'close',
                role: 'cancel',
                handler: () => {
                }
            });
        }
        
        this._snackBar.open(message, 'fechar', {
            duration: duration,
            panelClass: [color + '-snackbar'],
            verticalPosition: position
        });
    }

    async toastResponse(response: any) {
        return this.toast(response.error ? 'warning' : 'success', response.message);
    }

    // async popover(eventPopover: any, title: string, buttons: Array<Object>) {
    //     return await this.popoverController.create({
    //         component: ConfirmComponent,
    //         event: eventPopover,
    //         mode: 'ios',
    //         componentProps: {
    //             title: title,
    //             buttons: buttons,
    //         }
    //     });
    // }

    // async listPopover(eventPopover: any, title: string, buttons: Array<Object>) {
    //     return await this.popoverController.create({
    //         component: ConfirmComponent,
    //         event: eventPopover,
    //         mode: 'ios',
    //         componentProps: {
    //             title: title,
    //             buttons: buttons,
    //         }
    //     });
    // }

    async loading() {
        this.loader = true;
        this.spinner.show();
    }

    async loading_dismiss() {
        this.loader = false;
        this.spinner.hide();
    }
}

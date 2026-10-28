import { Injectable } from '@angular/core';
import { ToastController, LoadingController, PopoverController, AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
import { UserService } from '../modules/account/users/user.service';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { ListPopoverComponent } from '../components/list-popover/list-popover.component';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    loader: any;

    constructor(
        private router: Router,
        private loadingController: LoadingController,
        private popoverController: PopoverController,
        private alertController: AlertController,
        private toastr: ToastController,
        private userService: UserService,
    ) {
    }

    responseErrors(error: any) {
        if (error.status == 401) {
            if (this.router.url == '/auth/login') {
                this.toast('danger', 'Usuário ou senha inválidos');
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

    async toast(color: string, message: string, duration: number = 2000, position: any = 'top', cssClass = '', buttons: any = []) {
        if (buttons.length == 0) {
            buttons.push({
                icon: 'close',
                role: 'cancel',
                handler: () => {
                }
            });
        }

        const toast = await this.toastr.create({
            message: message,
            duration: duration,
            color: color,
            mode: 'ios',
            position: position,
            cssClass: cssClass,
            buttons: buttons
        });
        toast.present();
    }

    async toastResponse(response: any) {
        return this.toast(response.error ? 'warning' : 'success', response.message);
    }

    async popover(eventPopover: any, title: string, buttons: Array<Object>) {
        return await this.popoverController.create({
            component: ConfirmComponent,
            event: eventPopover,
            mode: 'ios',
            componentProps: {
                title: title,
                buttons: buttons,
            }
        });
    }

    async listPopover(eventPopover: any, title: string, buttons: Array<Object>) {
        return await this.popoverController.create({
            component: ConfirmComponent,
            event: eventPopover,
            mode: 'ios',
            componentProps: {
                title: title,
                buttons: buttons,
            }
        });
    }

    async loading(message: string) {
        this.loader = true;
        await this.loadingController.create({
            spinner: 'lines',
            message: message,
            translucent: false,
        })
            .then(
                (l: any) => {
                    l.present().then(() => {
                        if (!this.loader) {
                            l.dismiss();
                        }
                    });
                }
            )
    }

    async loading_dismiss() {
        this.loader = false;
        return await this.loadingController.dismiss();
    }

    is_valid_doc(doc: any) {
        if (!doc || doc.length == 11) {
            if (!doc
                || doc == "00000000000"
                || doc == "11111111111"
                || doc == "22222222222"
                || doc == "33333333333"
                || doc == "44444444444"
                || doc == "55555555555"
                || doc == "66666666666"
                || doc == "77777777777"
                || doc == "88888888888"
                || doc == "99999999999") {
                return false
            }
            else {
                var soma = 0
                var resto
                for (var i = 1; i <= 9; i++)
                    soma = soma + parseInt(doc.substring(i - 1, i)) * (11 - i)
                resto = (soma * 10) % 11
                if ((resto == 10) || (resto == 11)) resto = 0
                if (resto != parseInt(doc.substring(9, 10))) return false
                soma = 0
                for (var i = 1; i <= 10; i++)
                    soma = soma + parseInt(doc.substring(i - 1, i)) * (12 - i)
                resto = (soma * 10) % 11
                if ((resto == 10) || (resto == 11)) resto = 0
                if (resto != parseInt(doc.substring(10, 11))) return false
                return true

            }
        }
        else {
            if (!doc || doc.length != 14
                || doc == "00000000000000"
                || doc == "11111111111111"
                || doc == "22222222222222"
                || doc == "33333333333333"
                || doc == "44444444444444"
                || doc == "55555555555555"
                || doc == "66666666666666"
                || doc == "77777777777777"
                || doc == "88888888888888"
                || doc == "99999999999999") {
                return false
            }
            else {
                var tamanho = doc.length - 2
                var numeros = doc.substring(0, tamanho)
                var digitos = doc.substring(tamanho)
                var soma = 0
                var pos = tamanho - 7
                for (var i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--
                    if (pos < 2) pos = 9
                }
                var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
                if (resultado != digitos.charAt(0)) return false;
                tamanho = tamanho + 1
                numeros = doc.substring(0, tamanho)
                soma = 0
                pos = tamanho - 7
                for (var i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--
                    if (pos < 2) pos = 9
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
                if (resultado != digitos.charAt(1)) return false
                return true;
            }

        }
    }

}

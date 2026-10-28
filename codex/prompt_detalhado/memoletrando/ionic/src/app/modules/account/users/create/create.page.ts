import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { AccessLevelService } from '../../access-levels/access-level.service';
import { AccessLevel } from '../../access-levels/access-level';
import { ModalController } from '@ionic/angular';
import { SelectComponent } from 'src/app/components/select/select.component';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    id: number;
    user: any;
    access_levels: any;
    customers: any;
    editing: boolean = false;

    permissionAlert: any = {
        header: 'Nível de Acesso',
        translucent: true
    };

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? (o1.id === o2.id) : (o1 === o2);
    };

    compareWith = this.compareWithFn;

    constructor(
        private route: ActivatedRoute,
        private router: Router,

        private helperService: HelperService,
        private accessLevelService: AccessLevelService,
        private userService: UserService,
        private modalController: ModalController,
    ) {
        this.user = new User;
    }

    ionViewWillEnter() {
        this.user = new User;
    }

    ngOnInit() {
        this.id = this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;;
        this.getAccessLevels();
        if (this.id) {
            this.editing = true;
            this.getUser();
        }
    }

    compareById(itemOne, itemTwo) {
        return itemOne && itemTwo && itemOne.id == itemTwo.id;
    }

    getUser() {
        this.userService.find(['access_level', 'authenticable'], { id: this.id })
            .then(
                (data: any) => {
                    this.user = new User(data.user);
                },
                (error: any) => {
                    if (error.status == 401) {
                        this.router.navigateByUrl('login');
                        this.helperService.toast('secondary', 'Sua sessão expirou, digite suas credenciais novamente.');
                    } else {
                        this.helperService.toast('danger', 'Erro ao buscar usuários');
                    }
                }
            );
    }

    save() {
        if (this.user.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    store() {
        this.helperService.loading("Salvando")
        this.userService.store(this.user)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.toast('danger', data.message);
                        return false;
                    }
                    this.helperService.toast('success', data.message);
                    this.user = new User(data.user);
                    this.router.navigate(['users']);
                    this.helperService.loading_dismiss()
                },
                (error: any) => {
                    this.helperService.loading_dismiss()
                    this.helperService.responseErrors(error);
                }
            );
    }

    update() {
        this.helperService.loading("Alterando")
        this.userService.update(this.user)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.toast('danger', data.message);
                        return false;
                    }
                    this.helperService.loading_dismiss()

                    this.helperService.toast('success', data.message);
                },
                (error: any) => {
                    this.helperService.loading_dismiss()
                    this.helperService.responseErrors(error);
                }
            );
    }

    getAccessLevels() {
        this.accessLevelService.get()
            .then(
                (response: any) => {
                    if (response.error) {
                        this.access_levels = [];

                        this.helperService.toast('danger', response.message);
                    } else {
                        this.access_levels = [];
                        for (let access_level of response.access_levels) {
                            this.access_levels.push(new AccessLevel(access_level));
                        }
                    }
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }


    async selectAccessLevel() {
        const modal = await this.modalController.create({
            component: SelectComponent,
            componentProps: {
                title: 'Níveis de acesso',
                options: this.access_levels
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if (data) {
            this.user.serialize({ access_level: data });
        }
    }

    async selectCustomer() {
        const modal = await this.modalController.create({
            component: SelectComponent,
            componentProps: {
                title: 'Clientes',
                options: this.customers
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();

        if (data) {
            this.user.serialize({ authenticable: data });
            this.user.authenticable_id = data.id;
            this.user.authenticable_type = 'customers';
        }
    }
}

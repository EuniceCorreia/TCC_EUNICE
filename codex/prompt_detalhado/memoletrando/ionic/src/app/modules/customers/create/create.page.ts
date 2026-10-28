import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { Customer } from '../customer';

import { CustomerService } from '../customer.service';
import { HelperService } from 'src/app/base/helper.service';

import * as moment from 'moment';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    customer: Customer = new Customer;
    loading: boolean = false;
    states: any = [];
    editing: boolean = false;
    today: moment.Moment = moment();
    mask: string = "(00) 0000-00009";

    page = 'general';

    constructor(
        private customerService: CustomerService,
        private helperService: HelperService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.customer = new Customer;
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.init();
    }

    async init() {
        this.id = this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;

        if (this.id) {
            await this.get();
        }
    }

    async get() {
        this.customerService.find(['user', 'phone', 'address.city.state'], { id: this.id })
            .then(
                async (data: any) => {
                    this.customer = new Customer(data.customer);

                    let birth_date = moment(this.customer.birth_date, 'YYYY/MM/DD').format('DD/MM/YYYY');
                    this.customer.birth_date = birth_date;
                },
                (error: any) => {
                    this.helperService.responseErrors(error)
                }
            );
        this.loading = false;
    }

    save() {
        // if (!this.verifyBirthDate()) return
        if (!this.helperService.is_valid_doc(this.customer.doc)) {
            this.helperService.toast("warning", "CPF inválido");
            return;
        }

        if (this.customer.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    async update() {
        this.helperService.loading('Alterando...');

        this.customerService.internalUpdate(this.customer)
            .then(
                (data: any) => {
                    this.helperService.loading_dismiss();
                    if (data.error) {
                        this.helperService.toast('danger', data.error_message);
                        return false;
                    }
                    this.helperService.toast('success', 'Alterado com sucesso!');
                    this.router.navigate(['customers']);
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                }
            );
    }

    async store() {
        this.helperService.loading('Salvando...');

        this.customerService.internalStore(this.customer)
            .then(
                (data: any) => {
                    this.helperService.loading_dismiss();
                    if (data.error) {
                        this.helperService.toast('danger', data.error_message);
                        return false;
                    }
                    this.helperService.toast('success', 'Criado com sucesso!');
                    this.router.navigate(['customers']);
                },
                (error: any) => {
                    this.helperService.loading_dismiss();
                    this.helperService.responseErrors(error);
                }
            );
    }

    verifyBirthDate() {
        if (this.customer.birth_date) {
            let birth_date = moment(this.customer.birth_date, 'DD/MM/YYYY');
            if (this.customer.birth_date.trim().length < 8 || !birth_date.isValid() || (birth_date >= this.today)) {
                this.helperService.toast('warning', 'Data de nascimento inválida.');
                this.loading = false;
                return false;
            }
            this.customer.birth_date = birth_date.format('YYYY-MM-DD');

            return true;
        }

        return false;
    }

    changeSegment(event: any) {
        this.page = event.detail.value;
    }

    setMask() {
        this.mask = '(00) 0000-00009';
    }

    debug() {
        console.log(this.customer);
    }
}

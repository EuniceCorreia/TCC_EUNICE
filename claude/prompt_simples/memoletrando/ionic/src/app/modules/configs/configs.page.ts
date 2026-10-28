import { Component, OnInit } from '@angular/core';

import { ConfigService } from './config.service';
import { HelperService } from 'src/app/base/helper.service';

@Component({
    selector: 'app-configs',
    templateUrl: './configs.page.html',
    styleUrls: ['./configs.page.scss'],
})
export class ConfigsPage implements OnInit {

    config: any = {
        fantasy_name: '',
        open_fiscal_years: false
    }

    constructor(
        private config_service: ConfigService,
        private helperService: HelperService
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        this.config_service.get()
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.toast('danger', data.message);
                        return;
                    }
                    this.config = data.config;
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }

    save() {
        this.config_service.update(this.config)
            .then(
                (data: any) => {
                    if (data.error) {
                        this.helperService.toast('danger', data.message);
                        return;
                    }
                    this.config = data.config;
                    this.helperService.toast('success', data.message);
                },
                (error: any) => {
                    this.helperService.responseErrors(error);
                }
            )
    }

}

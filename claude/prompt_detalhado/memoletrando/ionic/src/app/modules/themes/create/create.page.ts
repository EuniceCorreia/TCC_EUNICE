import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { Theme } from '../theme';

import { ThemeService } from '../theme.service';
import { HelperService } from 'src/app/base/helper.service';
import { ImageService } from '../../images/image.service';
import { Image } from '../../images/image';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;

    id: number;
    theme: any;
    editing: boolean = false;
    page = 'general';
    loading: boolean = false;
    saving: boolean = false;

    url_s3: string = this.theme_service.url_s3;

    constructor(
        private theme_service: ThemeService,
        private helper_service: HelperService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.theme = new Theme;
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.theme = new Theme;
        this.id = this.id = this.route.snapshot.paramMap.get("id") ? parseInt(this.route.snapshot.paramMap.get("id")) : null;

        if (this.id) {
            this.editing = true;

            this.getTheme();
        }
    }

    changeSegment(event: any) {
        this.page = event.detail.value;
    }

    getTheme() {
        this.helper_service.loading('Aguarde');

        this.theme_service.find(['image'], { id: this.id })
            .then(
                async (data: any) => {

                    this.theme = new Theme(data.theme);
                    if (!this.theme.image) {
                        this.theme.image = new Image();
                    }
                    this.helper_service.loading_dismiss();
                },
                (error: any) => {
                    this.helper_service.loading_dismiss();
                    this.helper_service.responseErrors(error)
                }
            );
    }

    save() {
        if (this.theme.id > 0) {
            this.update();
        } else {
            this.store();
        }
    }

    store() {
        this.saving = true;

        this.theme_service.store(this.theme)
            .then(
                (data: any) => {
                    this.saving = false;

                    if (data.error) {
                        this.helper_service.toast('danger', data.error_message);
                        return false;
                    }
                    this.helper_service.toast('success', 'Salvo com sucesso!');
                    this.router.navigate(['themes'], {
                        state: { force: true }
                    });

                },
                (error: any) => {
                    this.saving = false;
                    this.helper_service.responseErrors(error);
                }
            );
    }

    update() {
        this.saving = true;
        this.theme_service.update(this.theme)
            .then(
                (data: any) => {
                    this.saving = false;
                    if (data.error) {
                        this.helper_service.toast('danger', data.error_message);
                        return false;
                    }

                    this.helper_service.toast('success', 'Alterado com sucesso!');
                    this.getTheme();
                },
                (error: any) => {
                    this.saving = false;
                    this.helper_service.responseErrors(error);
                }
            );
    }

    updateImage(event) {
        this.theme.image = event;
    }

    debug() {
        console.log(this.theme)
    }

}

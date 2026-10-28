import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup, ModalController, NavParams } from '@ionic/angular';
import { HelperService } from 'src/app/base/helper.service';

import { Image } from 'src/app/modules/images/image';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder-images.page.html',
  styleUrls: ['./reorder-images.page.scss'],
})
export class ReorderImages implements OnInit {
  @ViewChild(IonReorderGroup, { static: false }) reorderGroup: IonReorderGroup;

  @Input('images') images: Image[] = [];
  url_s3: string = environment.url_s3;

  constructor(
    private helperService: HelperService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {}

  async dismiss() {
    await this.modalController.dismiss(this.images);
  }

  async onRenderItems(event: any) {
    await this.helperService.loading('Reordenando');
    await event.detail.complete(this.images).map((item: any, index: number) => {
      item.order = index;
      return item;
    });
    await this.helperService.loading_dismiss();
  }
}

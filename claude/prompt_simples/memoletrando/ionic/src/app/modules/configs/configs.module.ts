import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthGuard } from '../account/auth/auth.guard';

import { ConfigsPage } from './configs.page';
import { BaseModule } from 'src/app/base/base.module';

const routes: Routes = [
    {
        path: '',
        data: {
            auth: [{ view: 'configs' }, { update: 'configs' }]
        },
        component: ConfigsPage,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BaseModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ConfigsPage]
})
export class ConfigsPageModule { }

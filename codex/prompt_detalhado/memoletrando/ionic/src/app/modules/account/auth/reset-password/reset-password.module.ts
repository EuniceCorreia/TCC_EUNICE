import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordPage } from './reset-password.page';
import { BaseModule } from 'src/app/base/base.module';

const routes: Routes = [
    {
        path: '',
        component: ResetPasswordPage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule { }

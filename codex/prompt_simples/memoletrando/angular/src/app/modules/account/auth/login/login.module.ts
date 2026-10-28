import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ToastrModule
    ],
    declarations: [LoginPage]
})
export class LoginPageModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';
import { BaseModule } from 'src/app/base/base.module';

const routes: Routes = [
    {
        path: '',
        component: CreatePage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
    ],
    declarations: [CreatePage]
})
export class CreatePageModule { }

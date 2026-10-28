import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './index.page';

import { BaseModule } from 'src/app/base/base.module';

const routes: Routes = [
    {
        path: '',
        component: IndexPage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
    ],
    declarations: [IndexPage]
})
export class IndexPageModule { }

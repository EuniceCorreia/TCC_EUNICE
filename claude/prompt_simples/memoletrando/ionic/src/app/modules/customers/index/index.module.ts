import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';

import { IndexPage } from './index.page';

const routes: Routes = [
    {
        path: '',
        component: IndexPage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        IndexPage, 
    ],
    entryComponents: [
    ]
})
export class IndexPageModule { }

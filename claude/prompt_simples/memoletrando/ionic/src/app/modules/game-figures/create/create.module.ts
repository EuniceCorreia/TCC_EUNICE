import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';
import { ImageInputModule } from 'src/app/components/image-input/image-input-module';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon'

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
        ImageInputModule,
        MatTreeModule,
        MatIconModule
    ],
    declarations: [CreatePage]
})
export class CreatePageModule { }

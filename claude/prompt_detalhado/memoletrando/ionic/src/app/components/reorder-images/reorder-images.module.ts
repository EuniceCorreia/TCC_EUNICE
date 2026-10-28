import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { ReorderImages } from './reorder-images.page';

const routes: Routes = [
    {
        path: '',
        component: ReorderImages
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ReorderImages,
    ],
    entryComponents: [
    ]
})
export class ReorderImagesModule { }

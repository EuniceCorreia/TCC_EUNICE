import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EndGameComponent } from './end-game.component';
import { BaseModule } from 'src/app/base/base.module';

const routes: Routes = [
    {
        path: '',
        component: EndGameComponent,
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
    ],
    declarations: [EndGameComponent],
})
export class EndGameModule { }

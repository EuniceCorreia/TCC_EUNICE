import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';
import { AuthGuard } from '../account/auth/auth.guard';
import { LevelPageComponent } from './level-page.component';

const routes: Routes = [
    {
        path: 'categoria/:id',
        component: LevelPageComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
        MaterialModule,
    ],
    declarations: [LevelPageComponent]
})
export class LevelPageComponentModule { }

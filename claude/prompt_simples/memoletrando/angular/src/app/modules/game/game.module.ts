import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';
import { AuthGuard } from '../account/auth/auth.guard';
import { AlertModule } from '../alert/alert.module';
import { ModalGameModule } from '../modal-game/modal-game.module';

const routes: Routes = [
    {
        path: ':id',
        component: GameComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
        MaterialModule,
        AlertModule,
        ModalGameModule
    ],
    declarations: [GameComponent],
})
export class GameModule { }

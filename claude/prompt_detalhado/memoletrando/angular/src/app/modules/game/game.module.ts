import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';
import { BaseModule } from 'src/app/base/base.module';
import { MaterialModule } from 'src/app/material-module';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../account/auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from '../alert/alert.module';
// import { BsModalModule } from 'ngx-bootstrap/modal';

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
        ToastrModule,
        AlertModule
        
    ],
    declarations: [GameComponent],
    providers: [GameComponent],
})
export class GameModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttemptPage } from './attempt.page';
import { MaterialModule } from 'src/app/material-module';

const routes: Routes = [
  {
    path: '',
    component: AttemptPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [AttemptPage]
})
export class AttemptPageModule { }

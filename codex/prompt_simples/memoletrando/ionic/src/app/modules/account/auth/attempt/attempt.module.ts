import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttemptPage } from './attempt.page';
import { BaseModule } from 'src/app/base/base.module';

const routes: Routes = [
  {
    path: '',
    component: AttemptPage
  }
];

@NgModule({
  imports: [
    BaseModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AttemptPage]
})
export class AttemptPageModule { }

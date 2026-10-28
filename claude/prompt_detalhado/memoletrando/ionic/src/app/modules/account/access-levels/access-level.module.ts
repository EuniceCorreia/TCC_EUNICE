import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/account/auth/auth.guard';
const routes: Routes = [
    {
        path: '',
        data: {
            auth: [{ view: 'access_levels' }],
        },
        loadChildren: () => import('./index/index.module').then(mod => mod.IndexPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        data: {
            auth: [{ create: 'access_levels' }],
        },
        loadChildren: () => import('./create/create.module').then(mod => mod.CreatePageModule),
        canActivate: [AuthGuard],
    },
    {
        path: ':id',
        data: {
            auth: [{ update: 'access_levels' }],
        },
        loadChildren: () => import('./create/create.module').then(mod => mod.CreatePageModule),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessLevelModule { }

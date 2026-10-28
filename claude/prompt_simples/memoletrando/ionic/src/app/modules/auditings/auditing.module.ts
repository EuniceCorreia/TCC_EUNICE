import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/account/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        data: {
            auth: [{ view: 'auditings' }]
        },
        loadChildren: () => import('./index/index.module').then(mod => mod.IndexPageModule),
        canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuditingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(mod => mod.LoginPageModule),
    },
    {
        path: 'attempt',
        loadChildren: () => import('./attempt/attempt.module').then(mod => mod.AttemptPageModule),
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password.module').then(mod => mod.ResetPasswordPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [
        RouterModule
    ],
})
export class AuthModule { }

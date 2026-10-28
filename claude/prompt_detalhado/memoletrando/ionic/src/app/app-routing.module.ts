import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'access-levels',
        loadChildren: () =>
            import('./modules/account/access-levels/access-level.module').then(
                (mod) => mod.AccessLevelModule
            ),
    },
    {
        path: 'auditings',
        loadChildren: () =>
            import('./modules/auditings/auditing.module').then(
                (mod) => mod.AuditingModule
            ),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/account/auth/auth.module').then(
                (mod) => mod.AuthModule
            ),
    },
    {
        path: 'configs',
        loadChildren: () =>
            import('./modules/configs/configs.module').then(
                (mod) => mod.ConfigsPageModule
            ),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./modules/dashboard/dashboard.module').then(
                (mod) => mod.DashboardPageModule
            ),
    },
    {
        path: 'game-figures',
        loadChildren: () =>
            import('./modules/game-figures/game-figure.module').then(
                (mod) => mod.GameFigureModule
            ),
    },
    {
        path: 'themes',
        loadChildren: () =>
            import('./modules/themes/theme.module').then(
                (mod) => mod.ThemeModule
            ),
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./modules/account/users/user.module').then(
                (mod) => mod.UserModule
            ),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }

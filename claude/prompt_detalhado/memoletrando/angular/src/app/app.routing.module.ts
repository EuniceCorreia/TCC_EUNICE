import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
        import('./modules/account/auth/auth.module').then(
            (mod) => mod.AuthModule
        ),
  },
  {
    path: 'temas',
    loadChildren: () =>
        import('./modules/home/home.module').then(
            (mod) => mod.HomeComponentModule
        ),
  },
  { path: 'game', loadChildren: () =>
        import('./modules/game/game.module').then(
            (mod) => mod.GameModule
        ),
  },
  { path: 'modal-game', loadChildren: () =>
        import('./modules/modal-game/modal-game.module').then(
            (mod) => mod.ModalGameModule
        ),
  },
  {
    path: 'niveis',
    loadChildren: () =>
        import('./modules/level-pages/level-page.module').then(
            (mod) => mod.LevelPageComponentModule
        ),
  },
  {
    path: 'end-game',
    loadChildren: () =>
        import('./modules/end-game/end-game.module').then(
            (mod) => mod.EndGameModule
        ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

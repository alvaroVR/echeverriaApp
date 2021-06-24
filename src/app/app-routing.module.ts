import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UsuarioGuard} from "./guards/usuario.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'listActivity',
    loadChildren: () => import('./pages/gestion-task-owner/gestion-task-owner.module').then(m => m.GestionTaskOwnerPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'startDay',
    data: {title: 'Principio Día'},
    loadChildren: () => import('./pages/principio-dia/principio-dia.module').then(m => m.PrincipioDiaPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'finishDay',
    loadChildren: () => import('./pages/final-dia/final-dia.module').then( m => m.FinalDiaPageModule),
    canLoad: [UsuarioGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

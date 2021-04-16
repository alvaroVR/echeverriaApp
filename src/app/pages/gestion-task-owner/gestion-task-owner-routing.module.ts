import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GestionTaskOwnerPage} from './gestion-task-owner.page';
import {UsuarioGuard} from "../../guards/usuario.guard";

const routes: Routes = [
  {
    path: '',
    component: GestionTaskOwnerPage
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskPageModule),
    canLoad: [UsuarioGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionTaskOwnerPageRoutingModule {
}
